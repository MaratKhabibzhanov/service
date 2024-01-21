import { FC, useLayoutEffect, useMemo, useState } from 'react';

import { dayMilliseconds, formItemLayout } from 'shared/consts';
import { RepairService } from 'shared/api';
import { getFullName } from 'shared/helpers';

import { DatePicker, Form, Select } from 'antd';

type FieldsType = {
  acceptor: Acceptor;
  day: string;
};

export const RegistrationForRepairsForm: FC = () => {
  const [form] = Form.useForm<FieldsType>();

  const [acceptors, setAcceptors] = useState<Acceptor[]>([]);

  useLayoutEffect(() => {
    RepairService.getAcceptors().then((response) => {
      setAcceptors(response.results);
    });
  }, []);

  const sendForm = (values) => {
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
        <DatePicker disabledDate={(d) => !d || d.isBefore(disableDates)} />
      </Form.Item>
    </Form>
  );
};
