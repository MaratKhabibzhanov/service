import { observer } from 'mobx-react-lite';
import './app.css';

import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

function App() {
  return (
    <>
      <Layout className="layout">
        <Layout.Header></Layout.Header>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
    </>
  );
}

export default observer(App);
