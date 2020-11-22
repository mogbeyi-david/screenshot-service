import { NextFunction, Response } from 'express';
import { ExpressRequest } from '../util/express';
import { ResponseType } from '../config/interfaces';
import ResponseHandler from '../util/response-handler';
import { generateRandomString } from '../util/generate-random-string';
import RabbitmqService from '../services/RabbitmqService';
import { QUEUES } from '../config/constants';
import ScreenShotRepository from '../repositories/ScreenShotRepository';

export async function snapWebsite(
  req: ExpressRequest,
  res: Response,
  next: NextFunction,
): Promise<ResponseType> {
  const {
    url,
  }: {
    url: string;
  } = req.body;

  try {
    const screenshotIdentifier = generateRandomString();
    const screenshotData = { screenshotIdentifier, url };
    RabbitmqService.publish(QUEUES.UPLOAD_SCREENSHOTS, screenshotData);
    return ResponseHandler.sendSuccessResponse({
      res,
      data: { screenshotIdentifier },
    });
  } catch (error) {
    return next(error);
  }
}

export async function getByIdentifier(
  req: ExpressRequest,
  res: Response,
  next: NextFunction,
): Promise<ResponseType> {
  const { identifier } = req.params;

  try {
    const screenshot = await ScreenShotRepository.getByIdentifier(identifier);
    if (!screenshot) {
      return ResponseHandler.sendErrorResponse({
        res,
        error: 'Screenshot not found',
      });
    }
    return ResponseHandler.sendSuccessResponse({
      res,
      data: { screenshot },
    });
  } catch (error) {
    return next(error);
  }
}
