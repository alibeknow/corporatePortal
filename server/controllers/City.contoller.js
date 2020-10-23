import CityService from '../services/City.service';
import { getPagination } from '../helpers/pagination';

export default class GeoPointController {


  static async getCities(req, res) {

    console.log('city controller')
    const result = await CityService.getCities();
    res.json(result);
  }
}
