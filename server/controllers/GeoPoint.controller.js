import path from 'path';
import fs from 'fs';



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
    // const { id } = req.params;
    // console.log(id);
    const result = await GeoPointService.getPoint();
    res.json(result);
  }

  static async getPointsByCity(req, res) {

    const result = await GeoPointService.getPointsByCity(req.params.id);
    res.json(result);
  }

  static async uploadFile(req, res) {
    const { userId, cityId } = req.body;
    const { files } = req;
    console.log('before upload')
    const result = await GeoPointService.uploadFile({ files, userId, cityId });
    console.log('This result message');

    res.json(result);
  }

  static async getImage(req, res) {
    const { id, link } = req.body;

    console.log('before upload', req.body)
    const result = await GeoPointService.getImage({ id, link });
    console.log('This result message');

    res.json(result);
  }

  static async roadRoute(req, res) {
    console.log(req.body)
 
   

    const result = await GeoPointService.roadRoute(req.body);
    res.json({
      result
    })
  }



  static async saveImage(req, res) {
    console.log(req)
    const { pointId } = req.body;
    const {file} = req.files
    const result = await GeoPointService.saveImage({ pointId, file });
  

    res.json(result);
  }

 static async getGeoPointFilter(req, res) {
  const result = await GeoPointService.getGeoPointFilter();
  res.json(result)
 }


}
