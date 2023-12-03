import { Button, Form, Input } from 'antd';
import { FC } from 'react';

type FieldType = {
  username: string;
  password: string;
  confirm?: string;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export const RegistrationForm: FC = () => {
  const [form] = Form.useForm<FieldType>();

  const sendForm = (values: FieldType) => {
    const dataToSend = { ...values };
    if (dataToSend.confirm) delete dataToSend.confirm;
    console.log(dataToSend);
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
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Surname"
        name="surname"
        rules={[{ required: true, message: 'Please input your surname!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Patronymic"
        name="patronymic"
        rules={[{ required: true, message: 'Please input your patronymic!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ sm: { offset: 12, span: 6 } }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
