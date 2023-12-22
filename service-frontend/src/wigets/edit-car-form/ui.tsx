import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import { formItemLayout } from 'shared/consts';
import { CarsModal } from 'features';
import { useStore } from 'app/store';
import { AdditionalService } from 'shared/api';

import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

type CarInfoFields = Omit<CarInfo, 'engine'> & {
  engine: number;
};

const EditCarForm: FC = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const { profile } = useStore();
  const [form] = Form.useForm<CarInfoFields>();

  if (!carId) throw new Error('No car ID found');

  const initialCarInfoFields = useMemo(
    () =>
      carId !== 'new' ? profile.carsInfo.find((car) => car.car_model.id === +carId) : undefined,
    [carId, profile.carsInfo]
  );

  const [currentCar, setCurrentCar] = useState<CarModel | null>(
    initialCarInfoFields?.car_model || null
  );
  const [engines, setEngines] = useState<Engine[]>([]);

  useEffect(() => {
    if (currentCar) {
      AdditionalService.getEngines(currentCar.id)
        .then((enginesData) => {
          setEngines(enginesData);
        })
        .catch((e) => console.warn(e));
    }
  }, [currentCar]);

  const changeCarModel = (model: CarModel) => {
    setCurrentCar(model);
    form.setFieldValue('car_model', model);
  };

  const onFinish = async (values: CarInfoFields) => {
    const engine = engines.find((item) => item.id === values.engine);
    if (!engine) throw new Error('engine not found');

    const currentValues = {
      ...values,
      sold_date: (values.sold_date as unknown as Dayjs).format('YYYY-MM-DD'),
      engine,
    };

    if (carId === 'new') {
      try {
        await profile.addCar(currentValues);
        navigate('/cars');
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const modifiedEngines = engines.map((item) => ({
    value: item.id,
    label: `${item.model}  ${item.engine_vol}`,
  }));

  return (
    <Form
      name="registration"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      initialValues={initialCarInfoFields}
      onFinish={onFinish}
    >
      <Form.Item<CarInfoFields>
        label="Car model"
        name="car_model"
        rules={[{ required: true, message: 'Please input your car model!' }]}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Input value={currentCar?.model} disabled />
          <CarsModal currentModel={currentCar} setCurrentCar={changeCarModel} />
        </Space.Compact>
      </Form.Item>
      <Form.Item<CarInfoFields>
        label="Engine"
        name="engine"
        rules={[{ required: true, message: 'Please input your engine!' }]}
      >
        <Select disabled={!currentCar} options={modifiedEngines} />
      </Form.Item>
      <Form.Item<CarInfoFields>
        label="VIN"
        name="vin"
        rules={[{ required: true, message: 'Please input your VIN!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<CarInfoFields>
        label="STS"
        name="vehicle_certificate"
        rules={[{ required: true, message: 'Please input your STS!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<CarInfoFields>
        label="Number"
        name="number"
        rules={[{ required: true, message: 'Please input your number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<CarInfoFields>
        label="Milage"
        name="mileage"
        rules={[{ required: true, message: 'Please input your milage!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item<CarInfoFields>
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
