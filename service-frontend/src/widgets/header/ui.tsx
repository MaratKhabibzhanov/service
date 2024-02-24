import { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';
import { AuthModal, Logout, MobileMenu, ThemeSwitcher } from 'features';

import { Button, Flex, Image, Layout, Menu, Space } from 'antd';
import { useGetMenuItems } from 'shared/hooks';

import logo from 'shared/img/logo.png';

const Header: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { auth, profile } = useStore();

  const menuItems = useGetMenuItems(profile.profile?.role);

  return (
    <Layout.Header className="header">
      <Space>
        {auth.isAuth && (
          <MediaQuery maxWidth={768}>
            <MobileMenu />
          </MediaQuery>
        )}
        <Link to="/">
          <Image src={logo} alt="logo" width={160} height={40} preview={false} />
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
          <Flex gap={20}>
            <Button type="primary" onClick={() => navigate('profile')}>
              {t('Profile')}
            </Button>
            <MediaQuery minWidth={769}>
              <Logout />
            </MediaQuery>
          </Flex>
        ) : (
          <AuthModal />
        )}
      </Space>
    </Layout.Header>
  );
};

export default observer(Header);
