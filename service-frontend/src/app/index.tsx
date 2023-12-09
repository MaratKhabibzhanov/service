import { FC, useLayoutEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import './app.css';

import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';

import { darkTheme, lightTheme } from 'shared/theme';
import { getRefreshTokens } from 'shared/helpers';
import { Header } from 'wigets';

import { useStore } from './store';
import MediaQuery from 'react-responsive';

const locales = { ruRU, enUS };

export const App: FC = () => {
  const { settings, profile, auth } = useStore();

  const initialRender = useRef(false);

  useLayoutEffect(() => {
    if (!initialRender.current) {
      const { local, session } = getRefreshTokens();
      if ((local || session) && !auth.isAuth) profile.getProfile();
      initialRender.current = true;
    }
  }, [profile, auth.isAuth]);

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
        <MediaQuery minWidth={769}>
          <Layout.Footer style={{ textAlign: 'center' }}>footer</Layout.Footer>
        </MediaQuery>
      </Layout>
    </ConfigProvider>
  );
};

export default observer(App);
