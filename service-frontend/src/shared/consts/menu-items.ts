type MenuKeys = '/' | 'schedule' | 'cars';

type MenuItems = {
  label: string;
  key: MenuKeys;
};

export const menuItems: MenuItems[] = [
  {
    label: 'Home',
    key: '/',
  },
  {
    label: 'Schedule',
    key: 'schedule',
  },
  {
    label: 'Cars',
    key: 'cars',
  },
];
