import { $api } from './$api';

export default class AuthService {
  static async auth(authData: { username: string; password: string }) {
    const request: Tokens = await $api.post('auth/jwt/create', { json: authData }).json();
    return request;
  }

  static async refreshTokens(refreshToken: string) {
    const request: Tokens = await $api
      .post('auth/jwt/refresh', { json: { refresh: refreshToken } })
      .json();
    return request;
  }
}
