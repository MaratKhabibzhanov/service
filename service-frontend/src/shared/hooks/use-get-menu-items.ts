import { useTranslation } from 'react-i18next';

import { menuItems } from 'shared/consts';

const useGetMenuItems = (role?: UserRole) => {
  const { t } = useTranslation();

  let currentMenuItems = menuItems;

  if (!role) {
    currentMenuItems = menuItems.filter((item) => item.key === '/');
  }

  if (role === 'USER') {
    currentMenuItems = menuItems.filter((item) => item.key !== 'schedule');
  } else {
    currentMenuItems = menuItems.filter((item) => item.key !== 'cars');
  }

  return currentMenuItems.map((item) => ({ ...item, label: t(item.label) }));
};

export default useGetMenuItems;
