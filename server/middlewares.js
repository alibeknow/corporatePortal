/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

import APIError from './helpers/APIError';
import RedisService from './services/Redis.service';
import config from './config';
import handleAsyncError from './helpers/handleAsyncError';

const ERROR_MESSAGE = 'Необходимо авторизоваться';
const redis = new RedisService();

export const isAuthenticated = handleAsyncError(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new APIError(ERROR_MESSAGE, 401, true);
  }
  const [type, token] = req.headers.authorization.split(' ');
  if (type !== 'Bearer') throw new APIError(ERROR_MESSAGE, 401, true);
  if (!token) throw new APIError(ERROR_MESSAGE, 401, true);
  const { id } = jwt.decode(token) || {};
  if (!id) throw new APIError(ERROR_MESSAGE, 401, true);
  const jwtid = await redis.get(`${id}:jwtid`);
  if (!jwtid) throw new APIError(ERROR_MESSAGE, 401, true);
  try {
    const verified = jwt.verify(token, config.sessionSecret, { jwtid });
    req.user = verified;
    return next();
  } catch (error) {
    throw new APIError(ERROR_MESSAGE, 401, true);
  }
});

