import redis from 'redis';
import util from 'util';
import * as config from '../config/env';
import { logger } from './logger';

export const redisClient = redis.createClient({
  host: config.REDIS_URL,
  port: 6379,
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis!');
});

export const redisAsync = {
  get: util.promisify(redisClient.get).bind(redisClient),
  set: util.promisify(redisClient.set).bind(redisClient) as (
    key: string,
    value: string,
    mode?: string,
    duration?: number,
  ) => Promise<{}>,
  hmset: util.promisify(redisClient.hmset).bind(redisClient),
  hmget: util.promisify(redisClient.hmget).bind(redisClient),
  hmgetall: util.promisify(redisClient.hgetall).bind(redisClient),
  expire: util.promisify(redisClient.expire).bind(redisClient),
  del: util.promisify(redisClient.del).bind(redisClient) as (
    key: string,
  ) => Promise<{}>,
  incr: util.promisify(redisClient.incr).bind(redisClient),
  ttl: util.promisify(redisClient.ttl).bind(redisClient),
};
