import { APP_PORT } from './config/env';
import app from './app';
import { logger } from './util/logger';

app.listen(APP_PORT, () => {
  logger.info(`Valiu App Started successfully on :${APP_PORT}\n`);
});
