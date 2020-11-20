import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import { NextFunction, Response } from 'express';
import morgan from 'morgan';
import ResponseHandler from './util/response-handler';

import user from './routes/user';



const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/users', user);

// ROUTES
app.get('/', async (req: ExpressRequest, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to the Website Snapper Application',
  });
});

app.use((req: ExpressRequest, res: Response) => {
  return ResponseHandler.sendErrorResponse({ res, error: 'Route not found' });
});

app.use(
  (error: any, req: ExpressRequest, res: Response, next: NextFunction) => {
    return ResponseHandler.sendFatalErrorResponse({ res, error });
  },
);

export default app;
