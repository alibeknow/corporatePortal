import path from 'path';
import fs from 'fs';

import parseKMZ from 'parse-kmz';

import GeoPointService from '../services/GeoPoint.service';
import { getPagination } from '../helpers/pagination';

const xmlReader = require('read-xml');
const convert = require('xml-js');
const { DOMParser } = require('xmldom');
const tj = require('togeojson');
const { html2json } = require('html2json');

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
    console.log(req.params);

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
}
