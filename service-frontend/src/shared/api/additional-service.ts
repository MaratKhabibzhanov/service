import { getUrlWithParams } from 'shared/helpers';
import { $api } from './$api';

export default class AdditionalService {
  static async getCarModels() {
    const request: DRFResponse<CarModel> = await $api.get('service/car_model/').json();
    return request;
  }

  static async getCarsInfo(owner?: number) {
    const url = owner ? getUrlWithParams('service/car/', { owner }) : 'service/car/';

    const request: DRFResponse<CarInfo> = await $api.get(url).json();
    return request;
  }

  static async getEngines(carId: number) {
    const request: Engine[] = await $api.get(`service/engine/?car_model_id=${carId}`).json();
    return request;
  }

  static async getUsers(search?: string) {
    const request: DRFResponse<Client> = await $api
      .get(`auth/users/?search=${search || ''}`)
      .json();
    return request;
  }
}
