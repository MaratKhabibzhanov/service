import { $api } from './$api';

type Passwords = { current_password: string; new_password: string };

export default class UserService {
  static async getMe() {
    const role: User = await $api.get('auth/users/me/').json();
    return role;
  }

  static async updateProfile(body: UserToUpdate) {
    const request: User = await $api.put('auth/users/me/', { json: body }).json();
    return request;
  }

  static async changePassword(body: Passwords) {
    const request = await $api.post('auth/users/set_password/', { json: body }).json();

    return request;
  }

  static async removeProfile() {
    const request = await $api.delete('auth/users/me/').json();
    return request;
  }
  static async addCar(body: CarInfo) {
    const request: CarInfo = await $api.post('service/avto/', { json: body }).json();
    return request;
  }
}
