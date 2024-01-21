import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { Dayjs } from 'dayjs';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { formItemLayout } from 'shared/consts';
import { RepairService } from 'shared/api';
import { getFullName, range } from 'shared/helpers';

import { DatePicker, Form, Select } from 'antd';

type FieldsType = {
  car: { label: string; value: number };
  acceptor: Acceptor;
  day: Dayjs;
  time: Dayjs;
  maintenance: { label: string; value: number };
};

const RegistrationForRepairsForm: FC = () => {
  const { carId } = useParams();
  const { profile } = useStore();
  const [form] = Form.useForm<FieldsType>();

  const [acceptors, setAcceptors] = useState<Acceptor[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

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

  const sendForm = (values: FieldsType) => {
    console.log(values);
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
        <DatePicker
          disabledDate={(d) => !d || d.isBefore(disableDates)}
          onChange={changeDate}
          disabled={!form.getFieldValue('acceptor')}
        />
      </Form.Item>
      <Form.Item
        name="time"
        label="Time"
        rules={[{ required: true, message: 'Please input time!' }]}
      >
        <DatePicker.TimePicker
          disabledTime={disabledTimes}
          showSecond={false}
          disabled={!form.getFieldValue('day')}
        />
      </Form.Item>
      <Form.Item<FieldsType> name="maintenance" label="Maintenance">
        <Select options={maintenancesToSelect} />
      </Form.Item>
    </Form>
  );
};

export default observer(RegistrationForRepairsForm);
