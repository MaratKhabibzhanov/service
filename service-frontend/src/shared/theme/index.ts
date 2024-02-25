import { ThemeConfig, theme } from 'antd';

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,

  components: {
    Menu: {
      colorBgBase: 'inherit',
      colorBgContainer: 'inherit',
      itemBg: 'inherit',
    },
  },
};

export const lightTheme: ThemeConfig = {
  token: {},
  components: {
    Menu: {
      colorBgBase: 'inherit',
      colorBgContainer: 'inherit',
      itemBg: 'inherit',
      colorPrimary: '#3c9ae8',
      colorText: '#fff',
    },
  },
};
