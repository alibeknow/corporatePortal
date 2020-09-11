import UserService from '../services/User.service';
import { getPagination } from '../helpers/pagination';

export default class UserController {
  static async getUsers(req, res) {
    const { filters, page, size } = req.body;

    const { limit, offset } = getPagination(page, size);
    const result = await UserService.getUsers({ limit, offset, filters });
    res.json(result);
  }

  static async getUser(req, res) {
    const { id } = req.params;
    const result = await UserService.getUser(id);
    res.json(result);
  }
}
