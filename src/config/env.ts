import appRootPath from 'app-root-path';
import dotenv from 'dotenv';

import { throwIfUndefined, randomizeMongoURL } from '../helpers';
export const NODE_ENV = process.env.NODE_ENV;

dotenv.config({ path: `${appRootPath.path}/.env` });

export const APP_PORT = throwIfUndefined(process.env.APP_PORT, 'APP_PORT');

export const AWS_ACCESS_KEY_ID = throwIfUndefined(
  process.env.AWS_ACCESS_KEY_ID,
  'AWS_ACCESS_KEY_ID',
);

export const AWS_SECRET_ACCESS_KEY = throwIfUndefined(
  process.env.AWS_SECRET_ACCESS_KEY,
  'AWS_SECRET_ACCESS_KEY',
);

export const S3_BUCKET_NAME = throwIfUndefined(
  process.env.S3_BUCKET_NAME,
  'S3_BUCKET_NAME',
);

export const AMQP_PASSWORD = throwIfUndefined(
  process.env.AMQP_PASSWORD,
  'AMQP_PASSWORD',
);

export const AMQP_USERNAME = throwIfUndefined(
  process.env.AMQP_USERNAME,
  'AMQP_USERNAME',
);

export const AMQP_CLIENT = throwIfUndefined(
  process.env.AMQP_CLIENT,
  'AMQP_CLIENT',
);

export const MONGO_URL =
  NODE_ENV === 'test'
    ? randomizeMongoURL(
        throwIfUndefined(process.env.MONGO_URL_TEST, 'MONGO_URL_TEST'),
      )
    : throwIfUndefined(process.env.MONGO_URL, 'MONGO_URL');


export const REDIS_URL =
    NODE_ENV === 'test'
        ? throwIfUndefined(process.env.REDIS_URL_TEST, 'REDIS_URL_TEST')
        : throwIfUndefined(process.env.REDIS_URL, 'REDIS_URL');