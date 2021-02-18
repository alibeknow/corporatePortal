import _ from './env'
console.log(process.env)
export default {
  env: process.env.NODE_ENV || 'development!!',
  port: process.env.PORT || 4000,
  database: process.env.DATABASE_URL || 'postgres://osm:mbvbZ5j3@0.0.0.0:5432/osm',
  apiVersion: process.env.API_VERSION || '1.0',
  sessionSecret: process.env.SESSION_SECRET || 'nfqnefonewifwenofnweif',
  redis: process.env.REDIS_URL || 'redis://192.168.89.1:6379/0',
  auth: {
    tokenExpire: process.env.AUTH_TOKEN_EXPIRE || 100 * 60 * 60, // 1 hour
  },
  activeDirectory: {
    url: process.env.AD_URL || 'ldap://it.sberbank-service.ru:389',
    username: process.env.AD_USERNAME || 'srv.ac-portal-ldap',
    password: process.env.AD_PASSWORD || 'fskJ5K3r8H',
    baseDN: process.env.AD_BASE_DN || 'dc=it,dc=sberbank-service,dc=ru',
    domain: process.env.AD_DOMAIN || 'it',
  },
};
