import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import './app.css';

import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';

import { darkTheme, lightTheme } from 'shared/theme';
import { Header } from 'wigets';
import { useStore } from './store';

const locales = { ruRU, enUS };

export const App: FC = () => {
  const { settings } = useStore();

  return (
    <ConfigProvider
      theme={settings.theme === 'dark' ? darkTheme : lightTheme}
      locale={locales[settings.locale]}
    >
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header />
        <Layout.Content className="container">
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>footer</Layout.Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default observer(App);
