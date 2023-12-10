import { $api } from './$api';

export default class AdditionalService {
  static async getCarModels() {
    const request: DRFResponse<CarModel> = await $api.get('API/carmodel/').json();
    return request;
  }
}
