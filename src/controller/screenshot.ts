import { NextFunction, Response } from 'express';
import { ExpressRequest } from '../util/express';
import { ResponseType } from '../config/interfaces';
import ResponseHandler from '../util/response-handler';
import * as ScreenshotHelpers from '../helpers/screenshot';
import ImageService from '../services/ImageService';
import { generateRandomString } from '../util/generate-random-string';
import RabbitmqService from '../services/RabbitmqService';
import { QUEUES } from '../config/constants';

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
    // const result = await ScreenshotHelpers.snapWebsite(url);
    // const link = await ImageService.upload(result, url);
    return ResponseHandler.sendSuccessResponse({ res, data: { screenshotIdentifier } });
  } catch (error) {
    return next(error);
  }
}
