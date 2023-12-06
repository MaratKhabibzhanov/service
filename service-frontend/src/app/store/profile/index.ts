import { makeAutoObservable } from 'mobx';
import { UserService } from 'shared/api';

export class Profile {
  profile: User | null = null;
  loadingStatus: LoadingStatus = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  async getProfile(): Promise<LoadingStatus> {
    this.loadingStatus = 'loading';

    try {
      const profile = await UserService.getMe();
      this.profile = profile;
      this.loadingStatus = 'idle';
    } catch (e) {
      this.loadingStatus = 'error';
    }

    return this.loadingStatus;
  }
}
