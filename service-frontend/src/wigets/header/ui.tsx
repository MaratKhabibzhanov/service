import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { AuthModal, MobileMenu, ThemeSwitcher } from 'features';
import { menuItems } from 'shared/consts';

import { Button, Layout, Menu, Space } from 'antd';

const Header: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { auth } = useStore();

  return (
    <Layout.Header className="header">
      <Space>
        {auth.isAuth && (
          <MediaQuery maxWidth={768}>
            <MobileMenu />
          </MediaQuery>
        )}
        <Link to="/" style={{ color: '#fff', fontSize: '20px' }}>
          Habib Service
        </Link>
      </Space>
      {auth.isAuth && (
        <MediaQuery minWidth={769}>
          <Menu
            items={menuItems}
            selectedKeys={[pathname]}
            onClick={(e) => navigate(e.key)}
            mode="horizontal"
            className="menu"
          />
        </MediaQuery>
      )}
      <Space size="large">
        <MediaQuery minWidth={769}>
          <ThemeSwitcher />
        </MediaQuery>
        {auth.isAuth ? (
          <Button type="primary" onClick={() => navigate('profile')}>
            Profile
          </Button>
        ) : (
          <AuthModal />
        )}
      </Space>
    </Layout.Header>
  );
};

export default observer(Header);
