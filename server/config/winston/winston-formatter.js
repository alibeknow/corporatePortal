import os from 'os';

import pjson from '../../../package.json';

export const developmentFormatter = (printf) => printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

export const productionFormatter = (printf) => printf((info) => {
  function parseInfo(infoObj) {
    for (const [key] of Object.entries(infoObj)) {
      delete infoObj[key]; // eslint-disable-line no-param-reassign
    }
    return infoObj;
  }

  return JSON.stringify({
    service: pjson.name,
    logger: 'application_logger',
    hostname: os.hostname(),
    level: info.level,
    msg: info.message,
    meta: {
      service: {
        version: pjson.version,
      },
      logger: {
        time: info.timestamp,
      },
      event: parseInfo(info),
    },
    err: {
      err: info.err,
      stack: info.stack,
    },
  });
});
