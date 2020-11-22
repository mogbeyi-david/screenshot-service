import { AMQP_CLIENT } from '../config/env';
import { QUEUES } from '../config/constants';
import { logger } from '../util/logger';
import ImageService from '../services/ImageService';
import * as ScreenshotHelpers from '../helpers/screenshot';
import ScreenShotRepository from '../repositories/ScreenShotRepository';
import { generateRandomString } from '../util/generate-random-string';

export default async function uploadWebsiteScreenShots(): Promise<void> {
  try {
    const connection = await require('amqplib').connect(AMQP_CLIENT);

    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUES.UPLOAD_SCREENSHOTS, { durable: true });

    await channel.prefetch(1);
    await channel.consume(
      QUEUES.UPLOAD_SCREENSHOTS,
      async (messageData: any) => {
        try {
          const messageAsString = messageData.content.toString();
          const { url, screenshotIdentifier: identifier } = JSON.parse(
            messageAsString,
          );
          const result = await ScreenshotHelpers.snapWebsite(url);
          const link = await ImageService.upload(result, url);
          if (!link) return;
          const name = `${url}-${generateRandomString()}`;
          const screenShot = await ScreenShotRepository.create({
            name,
            link,
            identifier: identifier,
          });
          logger.data(`screenShot ${screenShot}`);
          await ImageService.setInRedis(url, screenShot.link);
          channel.ack(messageData);
          return;
        } catch (error) {
          logger.error({
            message: error.toString(),
            id: new Date(),
          });
          channel.ack(messageData);
        }
      },
      { noAck: false },
    );
  } catch (error) {
    logger.error({
      message: error.toString(),
      id: new Date(),
    });
  }
}
