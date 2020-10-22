import GeoPoints from '../models/GeoPoints.model';
import UserModel from '../models/User.model';

export default class GeoPointService {
  static async savePoint(params) {
    const result = await GeoPoints.upsert(params);
    return result;
  }

  static async getPoint(id) {
    const result = await GeoPoints.findByPk(id);

    return result;
  }
}
