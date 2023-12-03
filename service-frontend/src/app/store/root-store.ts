import { Auth } from './auth';
import { Settings } from './settings';

export class RootStore {
  auth = new Auth();
  settings = new Settings();
}

export const rootStore = new RootStore();
