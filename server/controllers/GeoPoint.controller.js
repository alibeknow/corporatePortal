import GeoPointService from '../services/GeoPoint.service';
import { getPagination } from '../helpers/pagination';

export default class GeoPointController {

  static async saveCoordinates(req, res) {

    const { coordinates, name, userId, cityId } = req.body;

    const result = await GeoPointService.savePoint({
      coordinates: coordinates,
      name,
      userId,
      cityId,
    });
    res.json(result);
  }

  static async getPoints(req, res) {

    // const { id } = req.params;
    // console.log(id);
    const result = await GeoPointService.getPoint();
    res.json(result);
  }


 static async getPointsByCity(req, res) {
   console.log(req.params)

   const result = await GeoPointService.getPointsByCity(req.params.id);
   res.json(result)
 }

static async uploadFile(req, res) {
  if(!req.files) {
    res.send('File not found')
  }else {
    res.json({
      
      message: 'File uploaded succesfull'
    })
  }
}
}
