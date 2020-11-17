import path from 'path';
import fs, { createWriteStream } from 'fs';
import util from 'util';
import request from 'request'

import download from '../utils/downloadFile'
import unzipper from 'unzipper';
import { v4 as uuidv4 } from 'uuid';


import GeoPoints from '../models/GeoPoints.model';
import Uploads from '../models/Uploads.model'
import UserModel from '../models/User.model';
import { sequelize } from '../config/sequelize';
import readFileAsyncUtil from '../utils/readFileAsync'
import db from '../config/sequelize';


import { DOMParser } from 'xmldom'
import tj from 'togeojson'
import { html2json } from 'html2json'
import { Model } from 'sequelize';
import { REPL_MODE_SLOPPY } from 'repl';
import UploadsModel from '../models/Uploads.model';


const readFileAsync = util.promisify(fs.readFile);
const downloadAsync = util.promisify(download)

export default class GeoPointService {
  static async savePoint(params) {
    console.log(params);
    const result = await GeoPoints.upsert(params);
    return result;
  }

  static async getPoint(id) {
    const result = await GeoPoints.findAll({
      include: [{model: Uploads}],

    });

    return result;
  }

  static async getImage({id, link}) {


    if (!fs.existsSync(`${process.cwd()}/uploads`)) {
      fs.mkdirSync(`${process.cwd()}/uploads/`);
    }
console.log(id)
         const results = await sequelize.query(`select geo_point_id, array_agg(image) as files from uploads where geo_point_id = '${id}' group by geo_point_id`);
         console.log(results[0])

          if(results[0].length > 0)  {
            console.log('already exists')
            return {
              downloaded: false,
              files: results[0][0].files}
          }
       
         if(link) {
          const filename = await  download(link, `${uuidv4()}`)
          console.log(filename)



    await Uploads.upsert({
      geoPointId: id,
      image: filename
    })
         }



  const result = await  sequelize.query(`select geo_point_id, array_agg(image) as files from uploads where geo_point_id = '${id}' group by geo_point_id`)
  console.log(result[0])
    return {
      downloaded: true,
      files: result[0].length > 0 ? result[0][0].files : result[0]}
  }

  static async getPointsByCity(id) {
    let result;
console.log(db.uploads)
    if (id == 'null') {
      result = await GeoPoints.findAll({
        include: [{model: db.uploads}]
      });

      // result = await sequelize.query(`select * from geo_points gp join uploads up on
      // gp.id = up.geo_point_id`)

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

    // fs.createReadStream(`${process.cwd()}/tempUpload/temp.kmz`)
    //         .pipe(unzipper.Extract({ path: `${process.cwd()}/tempUpload/` }));
console.log('before file unzip')
    await readFileAsyncUtil(`${process.cwd()}/tempUpload/temp.kmz`, `${process.cwd()}/tempUpload/`)
console.log('after file unzip', fs.existsSync(`${process.cwd()}/tempUpload/doc.kml`))
          if (fs.existsSync(`${process.cwd()}/tempUpload/temp.kmz`)) {
            fs.unlink(`${process.cwd()}/tempUpload/temp.kmz`, (err) => {
              if (err) throw err;
            });
          }



console.log('read kml')
    const kmlString = await readFileAsync(`${process.cwd()}/tempUpload/doc.kml`, 'utf8');
          const kml = new DOMParser().parseFromString(kmlString);
          // var converted = tj.kml(kml);
          const convertedWithStyles = tj.kml(kml, { styles: true });
         // console.log(convertedWithStyles);



         if (fs.existsSync(`${process.cwd()}/tempUpload/doc.kml`)) {
          fs.unlink(`${process.cwd()}/tempUpload/doc.kml`, (err) => {
            if (err) throw err;
          });
        }




    let i = 0;
          console.log(cityId, userId);
          // console.log(convertedWithStyles.features.length)
           //return convertedWithStyles

                for (const feature of convertedWithStyles.features) {
            i++;



            let parsedResult
            if(feature.geometry.type !== 'Point') continue
            const coordinateString = `SRID=4326;POINT (${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`
            //     // console.log(coordinateString)
               const results = await sequelize.query(` select exists
               (select true from geo_points gp where
                coordinates = '${coordinateString}');`);
                console.log(results[0][0].exists)
              if(results[0][0].exists) continue
            if(!feature.properties.description) {
              parsedResult = null
            }
            else if(feature.properties.description[0] == '<') {
              const json = html2json(feature.properties.description)
              parsedResult = json.child.map((child)=> {

                  return {description: child.text}


              }).filter(item=> item.description)
            }else {
              parsedResult = feature.properties.description
            }

                  console.log(parsedResult)

              const result = await GeoPoints.upsert({
                coordinates: `${JSON.stringify({ type: 'Point', coordinates: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]] })}`,
                userId,
                cityId,
                description: parsedResult,
                name: feature.properties.name,
                google_link: feature.properties.gx_media_links
              });

console.log('******', result[0].id)





              // console.log('******', result);
              // console.log(i);
              // if (i > 4) break;



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
