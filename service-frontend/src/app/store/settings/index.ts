import { makeAutoObservable } from 'mobx';

type ThemeMode = 'dark' | 'light';

const themeFromLocalStorage: ThemeMode | null = localStorage.getItem('theme') as ThemeMode;
export class Settings {
  theme: ThemeMode = themeFromLocalStorage || 'light';

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(value: ThemeMode) {
    this.theme = value;
    localStorage.setItem('theme', value);
  }
}
