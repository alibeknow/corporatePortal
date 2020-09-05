import { loggers } from 'winston';

import config from './server/config';
import app from './server/config/express';
/* eslint-disable no-unused-vars */
import db from './server/config/sequelize';

const debug = require('debug')('corporate-portal-api-boilerplate:index');
/* eslint-enable no-unused-vars */

// Get default logger
const logger = loggers.get(config.loggerName); // eslint-disable-line no-global-assign

// module.parent check is required to support mocha watch
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    logger.info(`Application started on port ${config.port} (${config.env})`);
  });
}

export default app;
