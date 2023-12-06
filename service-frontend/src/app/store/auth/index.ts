import { makeAutoObservable, runInAction } from 'mobx';
import { AuthService } from 'shared/api';

export class Auth {
  isAuth = false;
  loadingStatus: LoadingStatus = 'idle';

  accessToken: string | null = null;
  refreshToken: string | null = null;

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

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }
}
