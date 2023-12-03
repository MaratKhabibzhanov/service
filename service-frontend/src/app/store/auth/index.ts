import { makeAutoObservable } from 'mobx';

export class Auth {
  isAuth = true;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(value: boolean) {
    this.isAuth = value;
  }
}
