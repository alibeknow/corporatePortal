module.exports = {
  development: {
    username: process.env.UNIQUE_NAME_PG_USER || 'docker',
    password: process.env.UNIQUE_NAME_PG_PASSWD || 'docker',
    database: process.env.UNIQUE_NAME_PG_DB || 'corporate_portal',
    port: process.env.UNIQUE_PORT_NUMBER || 25432,
    host: process.env.UNIQUE_NAME_PG_HOST || 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    define: {
      freezeTableName: true,
      underscored: true,
    },
  },
  test: {
    username: process.env.UNIQUE_NAME_PG_USER || 'docker',
    password: process.env.UNIQUE_NAME_PG_PASSWD || 'docker',
    database: process.env.UNIQUE_NAME_PG_DB || 'corporate_portal',
    port: process.env.UNIQUE_PORT_NUMBER || 5432,
    host: process.env.UNIQUE_NAME_PG_HOST || 'db',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  testing: {
    username: process.env.UNIQUE_NAME_PG_USER || 'docker',
    password: process.env.UNIQUE_NAME_PG_PASSWD || 'docker',
    database: process.env.UNIQUE_NAME_PG_DB || 'corporate_portal',
    port: process.env.UNIQUE_PORT_NUMBER || 5432,
    host: process.env.UNIQUE_NAME_PG_HOST || 'db',
    dialect: 'postgres',
    operatorsAliases: false,
  },
  production: {
    username: process.env.UNIQUE_NAME_PG_USER || 'docker',
    password: process.env.UNIQUE_NAME_PG_PASSWD || 'docker',
    database: process.env.UNIQUE_NAME_PG_DB || 'corporate_portal',
    port: process.env.UNIQUE_PORT_NUMBER || 5432,
    host: process.env.UNIQUE_NAME_PG_HOST || 'db',
    dialect: 'postgres',
    operatorsAliases: false,
  },
};
