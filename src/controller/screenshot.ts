import { NextFunction, Response } from 'express';
import { ExpressRequest } from '../util/express';
import { ResponseType } from '../config/interfaces';
import ResponseHandler from '../util/response-handler';
import * as ScreenshotHelpers from '../helpers/screenshot';
import ImageService from '../services/ImageService';
import { generateRandomString } from '../util/generate-random-string';

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
    const result = await ScreenshotHelpers.snapWebsite(url);
    const link = await ImageService.upload(result, url);
    return ResponseHandler.sendSuccessResponse({ res, data: { link } });
  } catch (error) {
    return next(error);
  }
}
