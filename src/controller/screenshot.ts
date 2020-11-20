import { NextFunction, Response } from 'express';
import { ExpressRequest } from '../util/express';
import { ResponseType } from '../config/interfaces';
import ResponseHandler from '../util/response-handler';

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
    return ResponseHandler.sendSuccessResponse({ res });
  } catch (error) {
    return next(error);
  }
}
