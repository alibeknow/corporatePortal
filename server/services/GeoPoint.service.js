import GeoPoints from '../models/GeoPoints.model';
import UserModel from '../models/User.model';
import {sequelize} from '../config/sequelize'

export default class GeoPointService {
  static async savePoint(params) {

    const result = await GeoPoints.upsert(params);
    return result;
  }

  static async getPoint(id) {
    const result = await GeoPoints.findAll();

    return result;
  }

  static async getPointsByCity(id) {
    const result =await GeoPoints.findAll({
      where: {cityId: id}
    });
    return result
  }
}
