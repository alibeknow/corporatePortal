import { promisify } from 'util';

import redis from 'redis';

import config from '../config';

const METHODS = ['get', 'set', 'del'];

export default class RedisService {
  constructor() {
    this.client = redis.createClient(config.redis);
    /* Промисифицируем нужные нам методы, используя нативный util */
    METHODS.forEach((method) => {
      this[`${method}Async`] = promisify(this.client[method]).bind(this.client);
    });
  }

  get(query) {
    return this.getAsync(query);
  }

  del(query) {
    return this.delAsync(query);
  }

  set(query, data, expiresIn) {
    const params = [query, data];
    if (expiresIn) {
      params.push('EX', expiresIn);
    }
    return this.setAsync(...params);

  }
}
