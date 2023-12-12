import { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import { formItemLayout } from 'shared/consts';
import { CarsModal } from 'features';
import { useStore } from 'app/store';

import { Button, DatePicker, Form, Input, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const EditCarForm: FC = () => {
  const { carId } = useParams();
  // const navigate = useNavigate();

  const { profile } = useStore();
  const [form] = Form.useForm<CarInfo>();

  if (!carId) throw new Error('No car ID found');

  const initialCarInfo = useMemo(
    () =>
      carId !== 'new' ? profile.carsInfo.find((car) => car.car_model.id === +carId) : undefined,
    [carId, profile.carsInfo]
  );

  const [currentCar, setCurrentCar] = useState<CarModel | null>(
    initialCarInfo ? initialCarInfo.car_model : null
  );

  const changeCarModel = (model: CarModel) => {
    setCurrentCar(model);
    form.setFieldValue('car_model', model);
  };

  const onFinish = async (values: CarInfo) => {
    const currentValues = {
      ...values,
      sold_date: (values.sold_date as unknown as Dayjs).format('YYYY-MM-DD'),
    };

    if (carId === 'new') {
      try {
        const response = await profile.addCar(currentValues);
        console.log(response);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return (
    <Form
      name="registration"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      initialValues={initialCarInfo}
      onFinish={onFinish}
    >
      <Form.Item<CarInfo>
        label="CarInfo"
        name="car_model"
        rules={[{ required: true, message: 'Please input your car model!' }]}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Input value={currentCar?.model} disabled />
          <CarsModal currentModel={currentCar} setCurrentCar={changeCarModel} />
        </Space.Compact>
      </Form.Item>
      <Form.Item<CarInfo>
        label="VIN"
        name="vin"
        rules={[{ required: true, message: 'Please input your VIN!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<CarInfo>
        label="STS"
        name="sts"
        rules={[{ required: true, message: 'Please input your STS!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<CarInfo>
        label="Number"
        name="number"
        rules={[{ required: true, message: 'Please input your number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<CarInfo>
        label="Milage"
        name="mileage"
        rules={[{ required: true, message: 'Please input your milage!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item<CarInfo>
        label="Commissioning date"
        name="sold_date"
        tooltip={{
          title: 'Date the car was purchased at the dealership',
          icon: <InfoCircleOutlined />,
        }}
        rules={[
          {
            type: 'object' as const,
            required: true,
            message: 'Please input your commissioning date!',
          },
        ]}
      >
        <DatePicker disabledDate={(d) => !d || d.isAfter(new Date()) || d.isBefore('2002-12-31')} />
      </Form.Item>

      <Form.Item wrapperCol={{ sm: { offset: 14, span: 6 } }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCarForm;
