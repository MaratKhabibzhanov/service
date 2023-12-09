import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logout, ThemeSwitcher } from 'features';
import { getMenuItems } from 'shared/helpers';
import { useStore } from 'app/store';

import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Space } from 'antd';

export const MobileMenu: FC = () => {
  const navigate = useNavigate();
  const { profile } = useStore();

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const clickLink = (value: string) => {
    navigate(value);
    setOpen(false);
  };

  const menuItems = getMenuItems(profile.profile?.role);

  return (
    <>
      <Button onClick={() => setOpen(true)} type="primary">
        <MenuOutlined />
      </Button>
      <Drawer
        style={{ minWidth: '3z00px' }}
        placement="left"
        width="auto"
        onClose={onClose}
        open={open}
      >
        <Flex vertical justify="space-between" style={{ height: '100%' }}>
          <Space direction="vertical">
            {menuItems.map((item) => (
              <Button type="text" onClick={() => clickLink(item.key)} key={item.label}>
                {item.label}
              </Button>
            ))}
          </Space>
          <Flex vertical gap={40}>
            <ThemeSwitcher />
            <Logout />
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
};
