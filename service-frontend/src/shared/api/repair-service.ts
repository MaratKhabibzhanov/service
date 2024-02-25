import { $api } from './$api';

type GetRepairNotesParams = { day: string; acceptorId: number };

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

  static async removeRepairNote(id: number) {
    const request: null = await $api.delete(`service/registration/${id}/`).json();
    return request;
  }

  static async getRepairNotes(params: GetRepairNotesParams) {
    const { day, acceptorId } = params;

    const request: DRFResponse<RegistrationForRepairs> = await $api
      .get(`service/registration/?day=${day}&acceptor_id=${acceptorId}`)
      .json();

    return request;
  }
}
