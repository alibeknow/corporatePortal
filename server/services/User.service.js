import { Op } from 'sequelize';

import db from '../config/sequelize';
import { getPagingData } from '../helpers/pagination';
import UserModel from '../models/User.model';

export default class UserService {
  static async getUsers(params) {
    const { limit, offset, filters } = params;

    const where = [];
    if (filters.departmentName) {
      where.push({
        '$department.name$': { [Op.like]: `%${filters.departmentName}%` },
      });
    }
    if (filters.phone) {
      where.push({ phone: filters.phone });
    }
    if (filters.fio) {
      where.push({ fio: { [Op.like]: `%${filters.fio}%` } });
    }

    const result = await UserModel.findAndCountAll({
      where: { [Op.and]: where },
      limit,
      offset,
      attributes: ['fio', 'phone'],
      include: [
        { model: db.workPosition, attributes: ['name'], as: 'workPosition' },
        {
          model: db.personalData,
          attributes: ['registration'],
          as: 'userData',
        },
        {
          model: db.departmentStructure,
          attributes: ['name'],
          as: 'department',
        },
      ],
    });
    return getPagingData({ data: result, limit });
  }

  static async getUser(id) {
    const result = await UserModel.findByPk(id, {
      attributes: ['fio', 'phone'],
      include: [
        { model: db.workPosition, attributes: ['name'], as: 'workPosition' },
        {
          model: db.personalData,
          as: 'userData',
        },
        {
          model: db.departmentStructure,
          attributes: ['name'],
          as: 'department',
        },
        {
          model: db.departmentStructure,
          attributes: ['name'],
          as: 'department',
        },
      ] });
    return result;
  }
}
