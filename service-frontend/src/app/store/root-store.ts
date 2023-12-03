import { Auth } from './auth';

export class RootStore {
  auth = new Auth();
}

export const rootStore = new RootStore();
