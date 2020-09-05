import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const schema = {
  login: {
    body: Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required(),
    })
  },
  refresh: {
    body: Joi.object({
      token: Joi.string().required(),
      refreshToken: Joi.string().uuid().required(),
    })
  },
};

/* Middleware для валидации запросов. Принимает ключ и тип валидации, данные должны быть описаны
в переменной schema */
export default function validate(key, type) {
  return (req, res, next) => {
    const validator = createValidator({ passError: true })[type];
    /* Обезопасим себя от ошибки отсутствия схемы */
    if (!schema[key] || !schema[key][type]) return next();
    return validator(schema[key][type])(req, res, next);
  };
}
