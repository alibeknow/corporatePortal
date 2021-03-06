import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const schema = {
  login: {
    body: Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  refresh: {
    body: Joi.object({
      token: Joi.string().required(),
      refreshToken: Joi.string()
        .uuid()
        .required(),
    }),
  },
  getUsers: {
    body: Joi.object({
      filters: Joi.object({
        departmentName: Joi.string(),
        phone: Joi.string(),
        fio: Joi.string(),
      }),
      page: Joi.number().default(1),
      size: Joi.number().default(50),
    }),
  },
  getUser: {
    params: Joi.object({
      id: Joi.string()
        .uuid()
        .required(),
    }),
  },
  savePoint: {
    body: Joi.object({
      coordinates: Joi.array().required(),
      name: Joi.string().required(),
      userId: Joi.string()
        .uuid()
        .required(),
      cityId: Joi.string()
        .uuid()
        .required(),
    }),
  },
  getPoint: {
    params: Joi.object({
      id: Joi.string()
        .uuid()
        .required(),
    }),
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
