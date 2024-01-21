import { $api } from './$api';

export default class RepairService {
  static async getAcceptors() {
    const request: DRFResponse<Acceptor> = await $api.get('service/acceptor/').json();
    return request;
  }
}
