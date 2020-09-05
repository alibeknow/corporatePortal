/* Процесс, в котором запускаются все cron-задачи, вынесен из процесса API */
import { CronJob } from 'cron';
import moment from 'moment';

import FileService from '../services/File.service';
import config from '../config';
import logger from '../config/winston/get-default-logger';

const runCommands = async () => {
  try {
    const commands = FileService
      .getFiles(__dirname)
      .filter((item) => !item.includes('.map') && item.endsWith('.js') && !item.endsWith('index.js'));

    commands.forEach((file) => {
      const command = require(file.replace(/\.js$/g, '')); // eslint-disable-line

      /* Не выполняем задачу, если для нее установлено ограничение по окружению */
      if (command.excludeEnv?.includes(config.env)) return;

      const job = new CronJob(command.schedule, command.task);
      logger.info(`${file} -> ${moment(job.nextDates()).format('DD.MM.YYYY HH:mm:ss')}`);
      job.start();
    });
  } catch (e) {
    logger.error(e);
  }
};

runCommands();
