import { $api } from './$api';

export default class UserService {
  static async getMe() {
    const role: User = await $api.get('auth/users/me/').json();
    return role;
  }
}
