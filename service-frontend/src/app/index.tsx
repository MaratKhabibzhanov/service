import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import './app.css';

import { Outlet } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';

import { darkTheme, lightTheme } from 'shared/theme';
import { Header } from 'wigets';
import { useStore } from './store';

export const App: FC = () => {
  const { settings } = useStore();
  return (
    <ConfigProvider theme={settings.theme === 'dark' ? darkTheme : lightTheme}>
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
