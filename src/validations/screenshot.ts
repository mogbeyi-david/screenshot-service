import { ExpressRequest } from '../util/express';
import { NextFunction, Response } from 'express';
import { ResponseType } from '../config/interfaces';
import Joi from 'joi';
import ResponseHandler from '../util/response-handler';

export async function validateSnapScreenshot(
  req: ExpressRequest,
  res: Response,
  next: NextFunction,
): Promise<ResponseType> {
  const schema = Joi.object()
    .keys({
      url: Joi.string().uri().required(),
    })
    .unknown(true);

  const validation = schema.validate(req.body);

  if (validation.error) {
    const error = validation.error.message
      ? validation.error.message
      : validation.error.details[0].message;
    return ResponseHandler.sendErrorResponse({
      res,
      error,
    });
  }
  return next();
}
