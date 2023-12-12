import { $api } from './$api';

export default class AdditionalService {
  static async getCarModels() {
    const request: DRFResponse<CarModel> = await $api.get('service/carmodel/').json();
    return request;
  }
}
