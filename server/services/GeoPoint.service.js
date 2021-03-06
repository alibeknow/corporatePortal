import path from 'path';
import fs, { createWriteStream } from 'fs';
import util from 'util';
import request from 'request'
const { Op } = require("sequelize");
import stringHash from 'string-hash'

import download from '../utils/downloadFile'
import unzipper from 'unzipper';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';

import GeoPoints from '../models/GeoPoints.model';
import Uploads from '../models/Uploads.model'
import UserModel from '../models/User.model';
import { sequelize } from '../config/sequelize';
import readFileAsyncUtil from '../utils/readFileAsync'
import db from '../config/sequelize';


import { DOMParser } from 'xmldom'
const DomParserNew = require('dom-parser');
const tj = require("@tmcw/togeojson");
import { html2json } from 'html2json'
import { Model } from 'sequelize';
import { REPL_MODE_SLOPPY } from 'repl';
import UploadsModel from '../models/Uploads.model';
import { link } from '@hapi/joi';


const readFileAsync = util.promisify(fs.readFile);
const downloadAsync = util.promisify(download)
const parserNew = DomParserNew()

export default class GeoPointService {
  static async savePoint(params) {
  
    const {coordinates} = JSON.parse(params.coordinates)
  
    const wktCoordinates = `SRID=4326;POINT (${coordinates[0]} ${coordinates[1]})`
    const selectedLocation = await sequelize.query(`SELECT id FROM cities WHERE ST_Intersects(coordinates , '${wktCoordinates}');`);
  
    if(selectedLocation[0].length > 0) {
      params.cityId = selectedLocation[0][0].id
    }
 
    const result = await GeoPoints.upsert(params);
    return result;
  }

  static async getImage({id, link}) {
    if (!fs.existsSync(path.join(process.cwd(), 'uploads'))) {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'));
    }
         const results = await sequelize.query(`select geo_point_id, array_agg(image) as files from uploads where geo_point_id = '${id}' group by geo_point_id`);
          if(results[0].length > 0)  {
         
            return {
              pointId: id,
              downloaded: false,
              files: results[0][0].files}
          }
  }

  static async getPointsByCity(params) {
    let result;

    if(!params.exclude && !params.include) {

      // result = await GeoPoints.findAll({
      //   include: [{model: db.uploads}]
      // });
      result = []
    }else if(params.exclude) {
 
       const exclude = JSON.parse(params.exclude)
      
      const withoutNull = exclude.filter(item=> item !== null)
      const filterHaveNull = exclude.some(item=> item === null)
       if(filterHaveNull && exclude.length == 1) {

       
       
        
        result = await GeoPoints.findAll({
          include: [{model: db.uploads}],
          where: {
            file_id: {
              
                //[Op.notIn]: filter,
                [Op.not]: null,
             
              
          }
          }
        });
        
       }else if(filterHaveNull) {
        result = await GeoPoints.findAll({
          include: [{model: db.uploads}],
          where: {
            file_id: {
              [Op.or]: {
                [Op.notIn]: withoutNull,
                [Op.not]: null,
              } 
            } 
          }
        });
       }
       else {
        result = await GeoPoints.findAll({
          include: [{model: db.uploads}],
          where: {
            file_id: {
              [Op.or]: {
                [Op.notIn]: withoutNull,
                [Op.is]: null,
              } 
            } 
          }
        });
       }
       
       
    }else {
     
 
      const include = JSON.parse(params.include)
      
      const withoutNull = include.filter(item=> item !== null)
      const filterHaveNull = include.some(item=> item === null)
      if(filterHaveNull && include.length == 1) {

       
       
        
        result = await GeoPoints.findAll({
          include: [{model: db.uploads}],
          where: {
            file_id: {
              
                //[Op.notIn]: filter,
                [Op.is]: null,
             
              
          }
          }
        });
        
       }else if(filterHaveNull) {
        result = await GeoPoints.findAll({
          include: [{model: db.uploads}],
          where: {
            file_id: {
              [Op.or]: {
                [Op.in]: withoutNull,
                [Op.is]: null,
              } 
            } 
          }
        });
       }else {
        result = await GeoPoints.findAll({
          include: [{model: db.uploads}],
          where: {
            file_id: {
              [Op.or]: {
                [Op.in]: withoutNull,
               
              } 
            } 
          }
        });
       }


    }

    return result;
  }

  static async saveImage({pointId, file}) {

    const  moveFileAsync = util.promisify(file.mv)

    try {

      const fileExt = file.mimetype.split('/')[1]
      if(fileExt !== 'png' && fileExt !== 'img') {
        return {message: 'Неправильное расширение файла'}
      }
      const filename = `${uuidv4()}.${fileExt}`
      await  moveFileAsync(path.join(process.cwd(), 'uploads', filename))
        const res =   await Uploads.upsert({
        geoPointId: pointId,
        image: filename
      })
      return {message: 'ok'}
    }catch(e) {

    }

  }

  static async uploadFile({ files, userId, cityId }) {
   
    if (!files) {
    // res.send('File not found')
      throw new Error('Файл не найден');
    } else {
      const fileId = uuidv4()
      const { file } = files;
      if (!/\.(kml|kmz)$/i.test(file.name)) {
        throw new Error('Неправильный тип файла');
      }
      //const fileName = file.name.slice(0, file.name.length - 4)
      const fileNameHash = stringHash(file.name)
     
      if (!fs.existsSync(`${process.cwd()}/tempUpload/${fileNameHash}`)) {
        fs.mkdirSync(`${process.cwd()}/tempUpload/${fileNameHash}`);
      }

    const  moveFileAsync = util.promisify(file.mv)
    
   
    try {
      await  moveFileAsync(`${process.cwd()}/tempUpload/${fileNameHash}/temp.kmz`)
      await readFileAsyncUtil(`${process.cwd()}/tempUpload/${fileNameHash}/temp.kmz`, `${process.cwd()}/tempUpload/${fileNameHash}`)

        if (fs.existsSync(`${process.cwd()}/tempUpload/${fileNameHash}/temp.kmz`)) {
            fs.unlink(`${process.cwd()}/tempUpload/${fileNameHash}/temp.kmz`, (err) => {
              if (err) throw err;
            });
          }
          const kmlString = await readFileAsync(`${process.cwd()}/tempUpload/${fileNameHash}/doc.kml`, 'utf8');
         
          const kml = new DOMParser().parseFromString(kmlString, 'text/xml');
          const convertedWithStyles = tj.kml(kml, { styles: true });
         if (fs.existsSync(`${process.cwd()}/tempUpload/${fileNameHash}/doc.kml`)) {
          fs.unlink(`${process.cwd()}/tempUpload/${fileNameHash}/doc.kml`, (err) => {
            if (err) throw err;
          });
        }
        if (!fs.existsSync(path.join(process.cwd(), 'uploads'))) {
          fs.mkdirSync(path.join(process.cwd(), 'uploads'));
        }
        for (const feature of convertedWithStyles.features) {
          
            let parsedResult
            if(feature.geometry.type !== 'Point') continue
            const coordinateString = `SRID=4326;POINT (${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`
      
               const results = await sequelize.query(` select exists
               (select true from geo_points gp where
                coordinates = '${coordinateString}');`);
             
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

            const wktCoordinates = `SRID=4326;POINT (${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`
    const selectedLocation = await sequelize.query(`SELECT id FROM cities WHERE ST_Intersects(coordinates , '${wktCoordinates}');`);
  
  
    if(selectedLocation[0].length > 0) {
      cityId = selectedLocation[0][0].id
    }
           

              const result = await GeoPoints.upsert({
                coordinates: `${JSON.stringify({ type: 'Point', coordinates: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]] })}`,
                userId,
                cityId,
                description: parsedResult,
                name: feature.properties.name,
                google_link: feature.properties.gx_media_links,
                file_id: fileId,
                file_name: file.name,
                icon: fileNameHash + '/' + feature.properties.icon
              });
  

              if(feature.properties.gx_media_links) {
                const filename = await  download(feature.properties.gx_media_links, `${uuidv4()}`)

                if(!filename) continue
                await Uploads.upsert({
                geoPointId: result[0].dataValues.id,
                image: filename
              })
               }

          }

          return {message: 'Файлы загружены'};



    } catch (error) {
      console.log(error)

    }

    }


  }
  static async roadRoute(params) {
 
    const {lat1, lng1, lat2, lng2} = params
    const url = 'http://localhost:8989' + '/route?' + 'point=' + lat1 + ',' + lng1 + '&point=' + lat2 + ',' + lng2 + '&type=json&locale=ru-RU&key=&elevation=false&profile=car&points_encoded=false'

    const data = await fetch(url)
    const result = await data.json()
    return result;
  }

 static async getGeoPointFilter() {
  const results = await sequelize.query(`select distinct file_id, file_name from geo_points;`);

  return results[0]
 }
}
