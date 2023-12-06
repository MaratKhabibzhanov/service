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

  refreshToken: string | null = initialRefreshToken;
  accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async logIn(authData: LogIn & { remember: boolean }): Promise<LoadingStatus> {
    this.loadingStatus = 'loading';

    try {
      const tokens = await AuthService.auth(authData);
      runInAction(() => {
        this.isAuth = true;
        this.loadingStatus = 'idle';

        const { access, refresh } = tokens;

        this.accessToken = access;
        this.refreshToken = refresh;

        if (authData.remember) {
          localStorage.setItem('refreshToken', refresh);
          localStorage.setItem('accessToken', access);
        } else {
          sessionStorage.setItem('refreshToken', refresh);
          sessionStorage.setItem('accessToken', access);
        }
      });
    } catch (e) {
      runInAction(() => {
        this.isAuth = false;
        this.loadingStatus = 'error';
      });
    }

    return this.loadingStatus;
  }
}
