import { $api } from './$api';

export default class RepairService {
  static async getAcceptors() {
    const request: DRFResponse<Acceptor> = await $api.get('service/acceptor/').json();
    return request;
  }

  static async getMaintenances(carId: number) {
    const request: Maintenance[] = await $api.get(`service/maintenance/?car_id=${carId}`).json();
    return request;
  }
}
