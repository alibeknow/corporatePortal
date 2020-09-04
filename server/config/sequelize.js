import fs from 'fs';
import path from 'path';

import Sequelize from 'sequelize';

import config from './config';
import logger from './winston/get-default-logger';

const db = {};

// connect to postgres testDb
const sequelizeOptions = {
  dialect: 'postgres',
  port: config.postgres.port,
  host: config.postgres.host,

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  ...(config.postgres.ssl && {
    ssl: config.postgres.ssl,
  }),
  ...(config.postgres.ssl &&
    config.postgres.ssl_ca_cert && {
      dialectOptions: {
        ssl: {
          ca: config.postgres.ssl_ca_cert,
        },
      },
    }),
  define: {
    underscored: true,
  },
};
const sequelize = new Sequelize(
  config.postgres.db,
  config.postgres.user,
  config.postgres.passwd,
  sequelizeOptions,
);
exports = sequelize;
const modelsDir = path.normalize(`${__dirname}/../schemas`);

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
  .filter((file) => file.indexOf('.') !== 0 && file.indexOf('.map') === -1)
  // import model files and save model names
  .forEach((file) => {
    logger.info(`Loading model file ${file}`);
    const model = require(path.join(modelsDir, file))( // eslint-disable-line
      sequelize,
      Sequelize.DataTypes,
    );

    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// assign the sequelize variables to the db object and returning the db.
module.exports = {
  ...db,
  sequelize,
  Sequelize,
};
