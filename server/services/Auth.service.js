import md5 from 'md5-hex';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import UserModel from '../models/User.model';
import APIError from '../helpers/APIError';
import config from '../config';

import ActiveDirectoryService from './ActiveDirectory.service';
import RedisService from './Redis.service';

const redis = new RedisService();

export default class AuthService {
  static async authenticate(login, password) {
    const instance = await UserModel.findOne({
      where: { login },
    });
    if (!instance) throw new APIError(`Пользователь ${login} не найден`);
    const { password: userPassword, ...user } = instance.toJSON();
    if (userPassword) {
      /* если для пользователя установлен пароль в БД, значит это локальный, не лезем в AD */
      if (userPassword !== md5(String(password))) {
        throw new APIError('Неправильный пароль');
      }
      return user;
    } else {
      const ad = new ActiveDirectoryService();
      await ad.checkAuth(login, password);
      return user;
    }
  }

  static async generateJWT(user) {
    const jwtid = uuid();
    await redis.set(`${user.id}:jwtid`, jwtid, config.auth.tokenExpire);
    const token = jwt.sign(user, config.sessionSecret, {
      expiresIn: config.auth.tokenExpire,
      jwtid,
    });
    return token;
  }

  static async generateRefreshToken(userId) {
    const refreshToken = uuid();
    await redis.set(`${userId}:refresh-token`, refreshToken);
    return refreshToken;
  }

  static async refresh({ token, refreshToken }) {
    const { exp, iat, jti, ...user } = jwt.verify(token, config.sessionSecret, { ignoreExpiration: true }); // eslint-disable-line no-unused-vars

    const storedRefreshToken = await redis.get(`${user.id}:refresh-token`);
    if (!storedRefreshToken || (storedRefreshToken !== refreshToken)) {
      throw new APIError('Ошибка обновления токена. Авторизуйтесь повторно');
    }
    const newRefreshToken = await this.generateRefreshToken(user.id);
    const newToken = await this.generateJWT(user);
    return { token: newToken, refreshToken: newRefreshToken };
  }
}
