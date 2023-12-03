import { Button, Input, Modal, Space, Typography } from 'antd';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

export const AuthModal: FC = () => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Log In
      </Button>
      <Modal
        title="Auth"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        style={{ maxWidth: '400px' }}
        footer={[<Button onClick={close}>Close</Button>, <Button type="primary">Log in</Button>]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Typography.Text>
            If you don't have an account,{' '}
            <Link to="/registration" onClick={close}>
              register now
            </Link>
          </Typography.Text>
          <Link to="/registration">Forgot your password?</Link>
        </Space>
      </Modal>
    </>
  );
};
