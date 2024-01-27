import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { Dayjs } from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { formItemLayout } from 'shared/consts';
import { RepairService } from 'shared/api';
import { getFullName, range } from 'shared/helpers';

import { Button, DatePicker, Form, Select, App } from 'antd';

type FieldsType = {
  car: { label: string; value: number };
  acceptor: number;
  day: Dayjs;
  time: Dayjs;
  maintenance: number;
};

const RegistrationForRepairsForm: FC = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { profile } = useStore();
  const { notification } = App.useApp();
  const [form] = Form.useForm<FieldsType>();

  const [acceptors, setAcceptors] = useState<Acceptor[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  const [currentMaintenance, setCurrentMaintenance] = useState<Maintenance | null>(null);

  if (!carId) throw new Error('No car ID found');

  useLayoutEffect(() => {
    RepairService.getAcceptors().then((response) => {
      setAcceptors(response.results);
    });

    RepairService.getMaintenances(Number(carId)).then((response) => {
      setMaintenances(response);
    });
  }, [carId]);

  const changeDate = (date: Dayjs | null) => {
    console.log(date?.format('YYYY-MM-DD'));
  };

  const openNotification = (variant: 'success' | 'error', description: string) => {
    notification[variant]({
      message: variant === 'success' ? 'Success' : 'Error',
      description,
    });
  };

  const sendForm = async (values: FieldsType) => {
    const dataToSend: RegistrationForRepairs = {
      day: values.day.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      acceptor: acceptors.find((item) => item.id === values.acceptor) || acceptors[0],
      maintenance: currentMaintenance || maintenances[0],
      car: profile.carsInfo.find((item) => item.id === values.car.value) || profile.carsInfo[0],
    };

    try {
      await RepairService.registrationForRepairs(dataToSend);
      openNotification('success', 'Your entry has been sent');
      navigate('/');
    } catch (e) {
      console.log(e);
      openNotification('error', (e as Error).message);
    }
  };

  const disableDates = useMemo(() => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime());
    return currentDate;
  }, []);

  const disabledTimes = () => {
    const hours = range(0, 24);
    const currentDisabledHours = [...hours.slice(0, 9), ...hours.slice(20, 24)];

    return {
      disabledHours: () => currentDisabledHours,
      disabledMinutes: () => range(30, 60),
    };
  };

  const acceptorsToSelect = acceptors.map((item) => ({
    value: item.id,
    label: getFullName(item),
  }));

  const maintenancesToSelect = maintenances.map((item) => ({
    value: item.id,
    label: item.operation,
  }));

  const carsToSelect = useMemo(
    () =>
      profile.carsInfo.map((item) => ({
        value: item.id,
        label: `${item.car_model.model} ${item.number}`,
      })),
    [profile.carsInfo]
  );

  const initialValues = useMemo(() => {
    const currentCar = carsToSelect.find((item) => item.value === Number(carId));
    return { car: currentCar };
  }, [carId, carsToSelect]);

  return (
    <Form
      name="registration-for-repair"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={sendForm}
    >
      <Form.Item<FieldsType> name="car" label="Car" rules={[{ required: true }]}>
        <Select options={carsToSelect} />
      </Form.Item>
      <Form.Item<FieldsType>
        label="Acceptor"
        name="acceptor"
        rules={[{ required: true, message: 'Please select your acceptor!' }]}
      >
        <Select options={acceptorsToSelect} />
      </Form.Item>
      <Form.Item<FieldsType>
        name="day"
        label="Date"
        rules={[{ required: true, message: 'Please input date!' }]}
      >
        <DatePicker disabledDate={(d) => !d || d.isBefore(disableDates)} onChange={changeDate} />
      </Form.Item>
      <Form.Item
        name="time"
        label="Time"
        rules={[{ required: true, message: 'Please input time!' }]}
      >
        <DatePicker.TimePicker disabledTime={disabledTimes} showSecond={false} />
      </Form.Item>
      <Form.Item<FieldsType> name="maintenance" label="Maintenance">
        <Select
          options={maintenancesToSelect}
          onChange={(value) =>
            setCurrentMaintenance(maintenances.find((item) => item.id === value) || null)
          }
        />
      </Form.Item>
      <Form.Item label="Price">
        <span>{currentMaintenance?.total_cost}</span>
      </Form.Item>

      <Form.Item wrapperCol={{ sm: { offset: 14, span: 6 } }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(RegistrationForRepairsForm);
