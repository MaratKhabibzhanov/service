import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { ProfileSkeleton } from 'shared/ui';
import { formItemLayout } from 'shared/consts';

import { Button, Form, Input } from 'antd';

type FieldType = Omit<NewUser, 'password'>;

const UserProfile: FC = () => {
  const { profile } = useStore();

  const [form] = Form.useForm<FieldType>();

  useEffect(() => {
    profile.getProfile();
  }, [profile]);

  if (profile.loadingStatus === 'loading') return <ProfileSkeleton />;

  return (
    <Form
      name="registration"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      // onFinish={sendForm}
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        initialValue={'asd'}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          { required: true, message: 'Please input your email!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="First name"
        name="first_name"
        rules={[{ required: true, message: 'Please input your First name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Last name"
        name="last_name"
        rules={[{ required: true, message: 'Please input your Last name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Patronim"
        name="patronim"
        rules={[{ required: true, message: 'Please input your patronim!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ sm: { offset: 12, span: 6 } }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(UserProfile);
