import { $api } from './$api';

export default class RegistrationService {
  static async registration(user: User) {
    const request: User = await $api.post(`auth/users/`, { json: user }).json();
    return request;
  }
}
