import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';

import { Button, Checkbox, Form, Input, Modal, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

const AuthModal: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form] = Form.useForm<FieldType>();

  const { auth, profile } = useStore();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const close = () => {
    setOpen(false);
    setError('');
    form.resetFields();
  };

  const onFinish = (values: FieldType) => {
    auth.logIn(values).then((response) => {
      if (response === 'ok') {
        setOpen(false);
        profile.getProfile();
        navigate('/');
      } else {
        setError(response);
      }
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t('Sign In')}
      </Button>
      <Modal
        title={t('Authorization')}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={close}
        style={{ maxWidth: '400px' }}
        footer={[
          <Button onClick={close} key="close">
            {t('Close')}
          </Button>,
        ]}
      >
        <Form name="auth_form" form={form} initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('Please input your username!') }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t('Username')}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: t('Please input your password!') }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('Password')}
            />
          </Form.Item>
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('Remember me')}</Checkbox>
            </Form.Item>
            <Link to="/" style={{ float: 'right' }} onClick={close}>
              {t('Forgot password')}
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={auth.loadingStatus === 'loading'}
            >
              {t('Sign In')}
            </Button>
          </Form.Item>
          {`${t('Or')} `}
          <Link to="/registration" onClick={close}>
            {t('register now!')}
          </Link>
        </Form>
      </Modal>
    </>
  );
};

export default observer(AuthModal);
