import { FC, useLayoutEffect, useMemo, useState } from 'react';

import { formItemLayout } from 'shared/consts';
import { RepairService } from 'shared/api';
import { getFullName, range } from 'shared/helpers';

import { DatePicker, Form, Select } from 'antd';
import { Dayjs } from 'dayjs';

type FieldsType = {
  acceptor: Acceptor;
  day: string;
  time: string;
};

export const RegistrationForRepairsForm: FC = () => {
  const [form] = Form.useForm<FieldsType>();

  const [acceptors, setAcceptors] = useState<Acceptor[]>([]);

  useLayoutEffect(() => {
    RepairService.getAcceptors().then((response) => {
      setAcceptors(response.results);
    });
  }, []);

  const changeDate = (date: Dayjs | null) => {
    console.log(date?.format('YYYY-MM-DD'));
  };

  const sendForm = (values: FieldsType) => {
    console.log(values);
  };

  const acceptorsToSelect = acceptors.map((item) => ({
    value: item.id,
    label: getFullName(item),
  }));

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

  return (
    <Form
      name="registration-for-repair"
      form={form}
      scrollToFirstError
      {...formItemLayout}
      style={{ maxWidth: 600 }}
      onFinish={sendForm}
    >
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
    </Form>
  );
};
