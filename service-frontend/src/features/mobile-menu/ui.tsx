import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import { FC, useState } from 'react';

export const MobileMenu: FC = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} type="primary">
        <MenuOutlined />
      </Button>
      <Drawer title="Menu" placement="left" width="auto" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
