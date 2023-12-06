import { $api } from './$api';

export default class RegistrationService {
  static async registration(user: NewUser) {
    const request: NewUser = await $api.post(`auth/users/`, { json: user }).json();
    return request;
  }
}
