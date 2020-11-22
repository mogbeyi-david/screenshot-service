import { redisAsync } from '../util/redis';
import { ExpressRequest } from '../util/express';
import { NextFunction, Response } from 'express';
import ResponseHandler from '../util/response-handler';
import { ResponseType } from '../config/interfaces';

export async function checkInRedis(
  req: ExpressRequest,
  res: Response,
  next: NextFunction,
): Promise<ResponseType> {
  let { url } = req.body;

  try {
    const response = await redisAsync.get(url);
    console.log("Response", response);
    if (response) {
      return ResponseHandler.sendSuccessResponse({
        res,
        data: { url: response },
        message: 'Link to screenshot gotten successfully (from cache)',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
