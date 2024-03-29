import { makeAutoObservable, runInAction } from 'mobx';
import { AuthService } from 'shared/api';

const localToken = localStorage.getItem('refreshToken');
const sessionToken = sessionStorage.getItem('refreshToken');

let initialRefreshToken: null | string = null;

if (sessionToken) initialRefreshToken = sessionToken;
else if (localToken) initialRefreshToken = localToken;

export class Auth {
  isAuth = false;
  loadingStatus: LoadingStatus = 'idle';
  remember = false;

  refreshToken: string | null = initialRefreshToken;
  accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(tokens: Tokens) {
    this.isAuth = true;

    const { access, refresh } = tokens;

    this.accessToken = access;
    this.refreshToken = refresh;

    if (this.remember) {
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('accessToken', access);
    } else {
      sessionStorage.setItem('refreshToken', refresh);
      sessionStorage.setItem('accessToken', access);
    }
  }

  async logIn(authData: LogIn & { remember: boolean }): Promise<string> {
    this.loadingStatus = 'loading';
    this.remember = authData.remember;

    let response = 'ok';

    try {
      const tokens = await AuthService.auth(authData);
      response = 'ok';
      runInAction(() => {
        this.loadingStatus = 'idle';
        this.setAuth(tokens);
      });
    } catch (e) {
      if (e instanceof Error) {
        response = e.message;
      }

      runInAction(() => {
        this.isAuth = false;
        this.loadingStatus = 'error';
      });
    }

    return response;
  }

  async refreshTokens() {
    if (!this.refreshToken) return null;

    try {
      const tokens = await AuthService.refreshTokens(this.refreshToken);
      runInAction(() => {
        this.loadingStatus = 'idle';
        this.setAuth(tokens);
      });
    } catch (e) {
      runInAction(() => {
        this.isAuth = false;
        this.loadingStatus = 'error';
      });
    }

    return this.loadingStatus;
  }

  logOut = () => {
    this.isAuth = false;
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  };
}
