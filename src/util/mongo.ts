import mongoose from 'mongoose';
import { MONGO_URL } from '../config/env';
import { logger } from './logger';

export const db = mongoose.createConnection(MONGO_URL, {
  keepAlive: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

interface Connection extends mongoose.Connection {
  host: string;
  port: number;
}

db.then((conn: Connection) => {
  logger.info(
    `MongoDB connected successfully to ${conn.host}:${conn.port}/${conn.db.databaseName}`,
  );
});

db.on('connected', () => {
  logger.info('db connected');
});
