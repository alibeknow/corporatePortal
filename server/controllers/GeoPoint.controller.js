import GeoPointService from '../services/GeoPoint.service';
import { getPagination } from '../helpers/pagination';

export default class GeoPointController {
  static async saveCoordinates(req, res) {
    const { coordinates, name, userId, cityId } = req.body;
    const result = await GeoPointService.savePoint({
      coordinates,
      name,
      userId,
      cityId,
    });
    res.json(result);
  }

  static async getPoints(req, res) {
    const { id } = req.params;
    console.log(id);
    const result = await GeoPointService.getPoint(id);
    res.json(result);
  }
}
