import { makeAutoObservable, runInAction } from 'mobx';
import { UserService } from 'shared/api';

export class Profile {
  profile: User | null = null;
  carsInfo: CarInfo[] = [];

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

  async addCar(car: CarInfo) {
    let response = null;
    try {
      const newCar = await UserService.addCar(car);
      runInAction(() => {
        this.carsInfo.push(newCar);
        response = 'ok';
      });
    } catch (e) {
      console.warn(e);
      response = (e as Error).message;
    }

    return response;
  }

  async getCars() {
    this.loadingStatus = 'loading';
    let response = null;

    try {
      const carsData = await UserService.getCarsInfo();
      runInAction(() => {
        this.carsInfo = carsData.results;
        this.loadingStatus = 'idle';

        response = 'ok';
      });
    } catch (e) {
      console.warn(e);
      response = (e as Error).message;
      this.loadingStatus = 'error';
    }

    return response;
  }

  async removeCar(id: number) {
    this.loadingStatus = 'loading';
    let response = null;

    try {
      await UserService.removeCar(id);

      runInAction(() => {
        this.carsInfo = this.carsInfo.filter((item) => item.id !== id);
        this.loadingStatus = 'idle';

        response = 'ok';
      });
    } catch (e) {
      console.warn(e);
      response = (e as Error).message;
      this.loadingStatus = 'error';
    }

    return response;
  }
}
