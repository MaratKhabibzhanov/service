import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './app.css';

import { Outlet } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';

import { rootStore, RootStoreContext } from './store';
import { darkTheme, lightTheme } from 'shared/theme';
import { Header } from 'wigets';

export const App: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(window.localStorage.getItem('theme') === 'dark');

  return (
    <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <RootStoreContext.Provider value={rootStore}>
        <Layout className="layout">
          <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
          <Layout.Content>
            <Outlet />
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>footer</Layout.Footer>
        </Layout>
      </RootStoreContext.Provider>
    </ConfigProvider>
  );
};

export default observer(App);
