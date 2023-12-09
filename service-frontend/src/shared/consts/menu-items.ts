type MenuKeys = '/' | 'schedule' | 'auto';

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
    label: 'Auto',
    key: 'auto',
  },
];
