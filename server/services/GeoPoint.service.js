import path from 'path';
import fs from 'fs';
import util from 'util';


import download from 'download';
import unzipper from 'unzipper';
import { v4 as uuidv4 } from 'uuid';


import GeoPoints from '../models/GeoPoints.model';
import UserModel from '../models/User.model';
import { sequelize } from '../config/sequelize';

const xmlReader = require('read-xml');
const convert = require('xml-js');
import { DOMParser } from 'xmldom'
import tj from 'togeojson'
import { html2json } from 'html2json'


const readFileAsync = util.promisify(fs.readFile);
const downloadAsync = util.promisify(download)

export default class GeoPointService {
  static async savePoint(params) {
    console.log(params);
    const result = await GeoPoints.upsert(params);
    return result;
  }

  static async getPoint(id) {
    const result = await GeoPoints.findAll();

    return result;
  }

  static async getPointsByCity(id) {
    let result;

    if (id == 'null') {
      result = await GeoPoints.findAll();
    } else {
      result = await GeoPoints.findAll({
        where: { cityId: id },
      });
    }

    return result;
  }

  static async uploadFile({ files, userId, cityId }) {
    console.log(userId, cityId);
    if (!files) {
    // res.send('File not found')
      throw new Error('Файл не найден');
    } else {
      const { file } = files;

      console.log(file);


      if (!/\.(kml|kmz)$/i.test(file.name)) {
        throw new Error('Неправильный тип файла');
      }
      if (!fs.existsSync(`${process.cwd()}/tempUpload`)) {
        fs.mkdirSync(`${process.cwd()}/tempUpload/`);
      }

    const  moveFileAsync = util.promisify(file.mv)
    try {
      await  moveFileAsync(`${process.cwd()}/tempUpload/temp.kmz`)

    fs.createReadStream(`${process.cwd()}/tempUpload/temp.kmz`)
            .pipe(unzipper.Extract({ path: `${process.cwd()}/tempUpload/` }));

          if (fs.existsSync(`${process.cwd()}/tempUpload/temp.kmz`)) {
            fs.unlink(`${process.cwd()}/tempUpload/temp.kmz`, (err) => {
              if (err) throw err;
            });
          }




    const kmlString = await readFileAsync(`${process.cwd()}/tempUpload/doc.kml`, 'utf8');
          const kml = new DOMParser().parseFromString(kmlString);
          // var converted = tj.kml(kml);
          const convertedWithStyles = tj.kml(kml, { styles: true });
          console.log(convertedWithStyles);






    let i = 0;
          console.log(cityId, userId);
          for (const feature of convertedWithStyles.features) {




            // console.log(i, feature.properties.gx_media_links)
            if(!feature.properties.gx_media_links) continue

            const coordinateString = `SRID=4326;POINT (${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`
            // console.log(coordinateString)
            const results = await sequelize.query(` select exists (select true from geo_points gp where coordinates = '${coordinateString}');`);
            // console.log('______', results[0][0].exists)
            if(!results[0][0].exists) continue

        // console.log(i, feature.properties.gx_media_links)
        if(!feature.properties.gx_media_links) continue

          // await  download(feature.properties.gx_media_links, `${process.cwd()}/uploads/${uuidv4()}.png`, ()=> {
          //   console.log('files downloaded')
          //   })



            }


                for (const feature of convertedWithStyles.features) {
            i++;


              const result = await GeoPoints.upsert({
                coordinates: `${JSON.stringify({ type: 'Point', coordinates: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]] })}`,
                userId,
                cityId,
                description: feature.properties.description,
                name: feature.properties.name,
              });

              // console.log('******', result);
              if (i > 25) break;



          }

          console.log('files uploaded')
          return {message: 'Файлы загружены'};



    } catch (error) {
      console.log(error)

    }





      // convertedWithStyles.features[0].properties.descriptionFormDom = []
      // html2json(convertedWithStyles.features[0].properties.description).forEach(item=> {
      //   if(item.node == 'text') {

      //   }
      // })
      // console.log(html2json(convertedWithStyles.features[0].properties.description))

      // res.json({
      //   convertedWithStyles
      // })
    }


  }
}
