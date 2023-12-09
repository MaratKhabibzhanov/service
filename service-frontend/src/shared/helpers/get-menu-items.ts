import { menuItems } from 'shared/consts';

const getMenuItems = (role?: UserRole) => {
  if (!role) {
    return menuItems.filter((item) => item.key === '/');
  }

  if (role === 'USER') {
    return menuItems.filter((item) => item.key !== 'schedule');
  }

  return menuItems.filter((item) => item.key !== 'auto');
};

export default getMenuItems;
