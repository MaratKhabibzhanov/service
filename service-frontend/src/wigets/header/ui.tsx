import { Dispatch, FC, SetStateAction } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { tton, Layout, Menu, Space, Switch, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { menuItems } from './consts';
import { AuthModal } from 'features';

type HeaderProps = {
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
};

export const Header: FC<HeaderProps> = ({ isDarkTheme, setIsDarkTheme }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChangeThemeMode = (value: boolean) => {
    if (value) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');
    setIsDarkTheme(value);
  };

  return (
    <Layout.Header className="header">
      <Typography.Text style={{ color: '#fff', fontSize: '20px' }}>Habib Service</Typography.Text>
      <Menu
        items={menuItems}
        selectedKeys={[pathname]}
        onClick={(e) => navigate(e.key)}
        mode="horizontal"
        className="menu"
      />
      <Space>
        <Typography.Text style={{ color: '#fff' }}>Dark mode:</Typography.Text>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={isDarkTheme}
          onChange={handleChangeThemeMode}
          style={{ marginBottom: '3px' }}
        />
      </Space>
      <AuthModal />
    </Layout.Header>
  );
};
