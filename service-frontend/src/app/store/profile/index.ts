import { makeAutoObservable, runInAction } from 'mobx';
import { UserService } from 'shared/api';

export class Profile {
  profile: User | null = null;
  cars: Car[] = [];

  loadingStatus: LoadingStatus = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  async getProfile(): Promise<LoadingStatus> {
    this.loadingStatus = 'loading';

    try {
      const profile = await UserService.getMe();
      runInAction(() => {
        this.profile = profile;
        this.loadingStatus = 'idle';
      });
    } catch (e) {
      runInAction(() => {
        this.loadingStatus = 'error';
      });
    }

    return this.loadingStatus;
  }

  setProfile(profile: User) {
    this.profile = profile;
    this.loadingStatus = 'idle';
  }

  async addCar(car: Car) {
    let response = null;
    try {
      const newCar = await UserService.addCar(car);
      runInAction(() => {
        this.cars.push(newCar);
        response = 'ok';
      });
    } catch (e) {
      console.warn(e);
      response = (e as Error).message;
    }

    return response;
  }
}
