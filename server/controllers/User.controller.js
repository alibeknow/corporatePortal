import httpStatus from 'http-status';

import User from '../models/User.model';

/**
 * Load user and append to req.
 */
export default class UserController {
  static async load(req, res, next, id) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      const e = new Error('User does not exist');
      e.status = httpStatus.NOT_FOUND;
      return next(e);
    }
    req.user = user;
    return next();
  }

  /**
   * Get user
   * @returns {User}
   */
  static async get(req, res) {
    return res.json(req.user);
  }

  /**
   * Create new user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
  static async create(req, res) {
    const user = User.build({
      username: req.body.username,
    });

    const result = await user.save();
    return res.json(result);
  }

  /**
   * Update existing user
   * @property {string} req.body.username - The username of user.
   * @property {string} req.body.mobileNumber - The mobileNumber of user.
   * @returns {User}
   */
  static async update(req, res) {
    const { user } = req;
    user.username = req.body.username;
    user.mobileNumber = req.body.mobileNumber;

    const result = await User.save();
    return res.json(result);
  }

  /**
   * Get user list.
   * @property {number} req.query.skip - Number of users to be skipped.
   * @property {number} req.query.limit - Limit number of users to be returned.
   * @returns {User[]}
   */
  static async list(req, res) {
    const { limit = 50 } = req.query;

    const users = await User.findAll({ limit });
    return res.json(users);
  }

  /**
   * Delete user.
   * @returns {User}
   */
  static async remove(req, res) {
    const { user } = req;

    const result = user.destroy();
    res.json(result);
  }
}
