import { $api } from './$api';

export default class AuthService {
  static async auth(authData: { username: string; password: string }) {
    const request: User = await $api.post('auth/jwt/create', { json: authData }).json();
    return request;
  }
}
