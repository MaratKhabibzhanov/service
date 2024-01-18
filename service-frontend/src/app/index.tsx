import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import './app.css';

import { ConfigProvider, Layout, Spin } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';

import { darkTheme, lightTheme } from 'shared/theme';
import { getRefreshTokens } from 'shared/helpers';
import { Footer, Header } from 'widgets';

import { useStore } from './store';
import MediaQuery from 'react-responsive';

const locales = { ruRU, enUS };

export const App: FC = () => {
  const { settings, profile, auth } = useStore();
  const [loading, setLoading] = useState(true);

  const initialRender = useRef(false);

  const firstUpdate = useCallback(async () => {
    if (!initialRender.current) {
      const { local, session } = getRefreshTokens();

      if ((local || session) && !auth.isAuth) {
        await auth.refreshTokens();
        await profile.getProfile();
      }

      setLoading(false);
      initialRender.current = true;
    }
  }, [auth, profile]);

  useLayoutEffect(() => {
    firstUpdate();
  }, [firstUpdate]);

  return (
    <ConfigProvider
      theme={settings.theme === 'dark' ? darkTheme : lightTheme}
      locale={locales[settings.locale]}
    >
      <Spin spinning={loading}>
        <Layout className="layout" style={{ minHeight: '100vh' }}>
          <Header />
          <Layout.Content className="container">
            <Outlet />
          </Layout.Content>
          <MediaQuery minWidth={769}>
            <Footer />
          </MediaQuery>
        </Layout>
      </Spin>
    </ConfigProvider>
  );
};

export default observer(App);
