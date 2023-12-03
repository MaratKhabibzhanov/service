import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStore } from 'app/store';
import { AuthModal, ThemeSwitcher } from 'features';

import { Layout, Menu, Space, Typography } from 'antd';
import { menuItems } from './consts';

export const Header: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { auth } = useStore();

  return (
    <Layout.Header className="header">
      <Typography.Text style={{ color: '#fff', fontSize: '20px' }}>Habib Service</Typography.Text>
      {auth.isAuth && (
        <Menu
          items={menuItems}
          selectedKeys={[pathname]}
          onClick={(e) => navigate(e.key)}
          mode="horizontal"
          className="menu"
        />
      )}
      <Space size="large">
        <ThemeSwitcher />
        <AuthModal />
      </Space>
    </Layout.Header>
  );
};
