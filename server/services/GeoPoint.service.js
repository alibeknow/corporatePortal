import UserModel from "../models/GeoPoints.model";

export default class GeoPointService {
  static async savePoint(params) {
    return await UserModel.upsert(params);
  }
  static async getPoint(id) {
    return await UserModel.findOneByPk(id);
  }
}
