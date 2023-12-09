import { Auth } from './auth';
import { Profile } from './profile';
import { Settings } from './settings';

export class RootStore {
  auth = new Auth();
  settings = new Settings();
  profile = new Profile();
}

export const rootStore = new RootStore();
