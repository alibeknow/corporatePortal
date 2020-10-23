
import CityModel from '../models/City.model'

export default class CityService {


  static async getCities() {
    const result = await CityModel.findAll();

    return result;
  }
}
