import { $api } from './$api';

export default class AdditionalService {
  static async getCarModels() {
    const request: DRFResponse<CarModel> = await $api.get('service/carmodel/').json();
    return request;
  }

  static async getEngines(carId: number) {
    const request: Engine[] = await $api.get(`service/engine/?car_model_id=${carId}`).json();
    return request;
  }
}
