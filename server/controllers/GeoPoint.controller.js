import GeoPointService from '../services/GeoPoint.service';
import { getPagination } from '../helpers/pagination';
import path from 'path'
import parseKMZ from 'parse-kmz'
import fs from 'fs'
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
    const file = req.files.file

    console.log(file)
   console.log(process.cwd())
    if( !fs.existsSync(`${process.cwd()}/tempUpload`)) {
      fs.mkdirSync(`${process.cwd()}/tempUpload/`);
    }
    file.mv(`${process.cwd()}/tempUpload/temp.kmz`,async function(err) {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }else {
     const parsedJson = await  parseKMZ.toJson(`${process.cwd()}/tempUpload/temp.kmz`)

     console.log(parsedJson)

        if(fs.existsSync(`${process.cwd()}/tempUpload/temp.kmz`)) {
          fs.unlink(`${process.cwd()}/tempUpload/temp.kmz`, err => {
            if (err) throw err;
          });
        }


      }


      res.send('File uploaded!');
    })
    // res.json({

    //   message: 'File uploaded succesfull'
    // })
  }
}
}
