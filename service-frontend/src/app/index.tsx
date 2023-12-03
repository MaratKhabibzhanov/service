import { observer } from 'mobx-react-lite';
import './app.css';

import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { rootStore, RootStoreContext } from './store';

function App() {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <Layout className="layout">
        <Layout.Header></Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </RootStoreContext.Provider>
  );
}

export default observer(App);
