import { makeAutoObservable } from 'mobx';

type ThemeMode = 'dark' | 'light';
type Locale = 'ruRU' | 'enUS';

const themeFromLocalStorage: ThemeMode | null = localStorage.getItem('theme') as ThemeMode;
const localeFromLocalStorage: Locale | null = localStorage.getItem('locale') as Locale;
export class Settings {
  theme: ThemeMode = themeFromLocalStorage || 'light';
  locale: Locale = localeFromLocalStorage || 'ruRU';

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(value: ThemeMode) {
    this.theme = value;
    localStorage.setItem('theme', value);
  }

  setLocale(value: Locale) {
    this.locale = value;
    localStorage.setItem('locale', value);
  }
}
