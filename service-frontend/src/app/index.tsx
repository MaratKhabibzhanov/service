import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import './app.css';
import 'shared/libs/i18n';

import { ConfigProvider, Layout, Spin, App as AntdApp } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';

import { darkTheme, lightTheme } from 'shared/theme';
import { Footer, Header } from 'widgets';

import { useStore } from './store';
import MediaQuery from 'react-responsive';

const locales = { ruRU, enUS };

export const App: FC = () => {
  const { settings, profile, auth } = useStore();
  const [loading, setLoading] = useState(true);

  const initialRender = useRef(false);

  const firstUpdate = useCallback(async () => {
    if (auth.isAuth) {
      await profile.getProfile();
    }

    setLoading(false);
  }, [auth, profile]);

  useLayoutEffect(() => {
    if (!initialRender.current) {
      firstUpdate();
      initialRender.current = true;
    }
  }, [firstUpdate]);

  return (
    <ConfigProvider
      theme={settings.theme === 'dark' ? darkTheme : lightTheme}
      locale={locales[settings.locale]}
    >
      <AntdApp>
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
      </AntdApp>
    </ConfigProvider>
  );
};

export default observer(App);
