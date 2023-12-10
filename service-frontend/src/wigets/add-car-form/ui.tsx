import { FC } from 'react';

import { formItemLayout } from 'shared/consts';

import { Button, Form, Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const AddCarForm: FC = () => {
  const [form] = Form.useForm<Car>();

  return (
    <Form
      name="registration"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      onFinish={() => undefined}
    >
      <Form.Item<Car> label="Car" name="car_model">
        <Input disabled />
      </Form.Item>
      <Form.Item<Car>
        label="VIN"
        name="vin"
        rules={[{ required: true, message: 'Please input your VIN!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Car>
        label="STS"
        name="sts"
        rules={[{ required: true, message: 'Please input your STS!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Car>
        label="Number"
        name="number"
        rules={[{ required: true, message: 'Please input your number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Car>
        label="Commissioning date"
        name="sold_date"
        tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: 'Please input your commissioning date!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<Car>
        label="Milage"
        name="mileage"
        rules={[{ required: true, message: 'Please input your milage!' }]}
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

export default AddCarForm;
