import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';

import { RegistrationService } from 'shared/api';
import { formItemLayout } from 'shared/consts';

type FieldType = NewUser & {
  confirm?: string;
};

export const RegistrationForm: FC = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm<FieldType>();
  const [notifyApi, contextHolder] = notification.useNotification();

  const sendForm = async (values: FieldType) => {
    const { confirm: _unusedKey, ...dataToSend } = values;

    try {
      await RegistrationService.registration(dataToSend);
      notifyApi.success({ message: 'Success', description: 'You can now log in' });
      navigate('/');
    } catch (e) {
      notifyApi.error({ message: 'Registration error', description: (e as Error).message });
    }
  };

  return (
    <Form
      name="registration"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      onFinish={sendForm}
    >
      {contextHolder}
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        label="Confirm password"
        name="confirm"
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
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

      <Form.Item wrapperCol={{ sm: { offset: 14, span: 6 } }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
