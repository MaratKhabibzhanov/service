import { makeAutoObservable } from 'mobx';

export class Auth {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }
}
