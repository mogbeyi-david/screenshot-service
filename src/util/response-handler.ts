import { Response } from 'express';
import { logger } from './logger';

class ResponseHandler {
  public static sendSuccessResponse({
    res,
    status = 200,
    message = 'Operation successful',
    data = null,
  }: {
    res: Response;
    status?: number;
    message?: string;
    data?: any;
  }) {
    return res.status(status).send({
      success: true,
      message,
      data,
    });
  }

  public static sendErrorResponse({
    res,
    status = 400,
    error = 'Operation failed',
  }: {
    res: Response;
    status?: number;
    error: string;
  }) {
    return res.status(status).send({
      success: false,
      error,
    });
  }

  public static sendFatalErrorResponse({
    res,
    error,
  }: {
    res: Response;
    error: any;
  }) {
    logger.error(error);
    logger.error(error.message);
    logger.error(error.stack);
    return res.status(500).send({
      success: false,
      error: 'Internal server error',
    });
  }
}

export default ResponseHandler;
