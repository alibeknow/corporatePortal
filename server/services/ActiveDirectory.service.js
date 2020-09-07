/* Сервис для взаимодействия с Active Directory */

import { promisify } from 'util';

import ActiveDirectory from 'activedirectory';

import config from '../config';
import APIError from '../helpers/APIError';

const METHODS = [
  'authenticate', 'find', 'findUser', 'findGroup', 'findUsers', 'findGroups',
  'groupExists', 'userExists', 'getGroupMembershipForUser', 'getGroupMembershipForGroup',
  'getUsersForGroup', 'isUserMemberOf',
];

export default class ActiveDirectoryService {
  static GROUPS = {
    NEWS_MODERATOR: 'PRT-NEWS-Moderator',
    IT_NEWS_AUTHOR: 'PRT-IT-NEWS-Author',
    MARKETING_NEWS_AUTHOR: 'PRT-MARKETING-NEWS-Author',
    POLL_MODERATOR: 'PRT-POLL-Moderator',
    IDEAS_MODERATOR: 'PRT-IDEAS-Moderator',
    SECURITY_MODERATOR: 'PRT-SECURITY-Moderator',
  };

  static COMMON_GROUP = 'PRT-User';

  constructor() {
    const client = new ActiveDirectory(config.activeDirectory);
    /* Промисифицируем методы клиента, чтобы не утонуть в callback hell */
    METHODS.forEach((method) => {
      this[method] = promisify(client[method]).bind(client);
    });
  }

  async checkAuth(login, password) {
    try {
      await this.authenticate(`${login}@${config.activeDirectory.domain}`, password);
    } catch (error) {
      throw new APIError('Неправльный логин или пароль');
    }
  }

  /* Получение всех нужных нам групп */
  async getGroups() {
    const groups = await this.findGroups('CN=PRT-*');
    return groups.filter(({ cn }) => Object.values(ActiveDirectoryService.GROUPS).includes(cn));
  }

  async getUsers() {
    const users = await this.getUsersForGroup(ActiveDirectoryService.COMMON_GROUP);
    return users;
  }

  /* Получение групп для пользователя с фильтром по "нашим" */
  async getUserGroups(login) {
    const allGroups = await this.getGroupMembershipForUser(login) || [];
    return allGroups.filter(({ cn }) => Object.values(ActiveDirectoryService.GROUPS).includes(cn));
  }
}
