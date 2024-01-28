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

  static async registrationForRepairs(body: RegistrationForRepairs) {
    const request: RegistrationForRepairs = await $api
      .post('service/registration/', { json: body })
      .json();
    return request;
  }

  static async getRepairNotes(day: string) {
    const request: DRFResponse<RegistrationForRepairs> = await $api
      .get(`service/registration/?day=${day}`)
      .json();

    return request;
  }
}
