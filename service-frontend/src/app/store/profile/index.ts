import { makeAutoObservable, runInAction } from 'mobx';
import { AdditionalService, UserService } from 'shared/api';

export class Profile {
  profile: User | null = null;
  carsInfo: CarInfo[] = [];

  loadingStatus: LoadingStatus = 'not_loaded';
  carsLoadingStatus: LoadingStatus = 'not_loaded';

  constructor() {
    makeAutoObservable(this);
  }

  async getProfile(): Promise<string> {
    this.loadingStatus = 'loading';

    let response = 'ok';

    try {
      const profile = await UserService.getMe();
      runInAction(() => {
        this.profile = profile;
        this.loadingStatus = 'idle';
      });
    } catch (e) {
      if (e instanceof Error) {
        response = e.message;
      }

      runInAction(() => {
        this.loadingStatus = 'error';
      });
    }

    return response;
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
      response = (e as Error).message;
    }

    return response;
  }

  async getCars() {
    this.carsLoadingStatus = 'loading';
    let response = 'ok';

    try {
      const carsData = await AdditionalService.getCarsInfo();
      runInAction(() => {
        this.carsInfo = carsData.results;
        this.carsLoadingStatus = 'idle';
      });
    } catch (e) {
      response = (e as Error).message;
      this.carsLoadingStatus = 'error';
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
