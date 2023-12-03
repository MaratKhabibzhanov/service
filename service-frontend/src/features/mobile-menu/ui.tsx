import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Space } from 'antd';

import { menuItems } from 'shared/consts';
import { ThemeSwitcher } from 'features';

export const MobileMenu: FC = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const clickLink = (value: string) => {
    navigate(value);
    setOpen(false);
  };

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
          <ThemeSwitcher />
        </Flex>
      </Drawer>
    </>
  );
};
