import { FC, useLayoutEffect, useState } from 'react';

import { Form, Select } from 'antd';
import { formItemLayout } from 'shared/consts';
import { RepairService } from 'shared/api';
import { getFullName } from 'shared/helpers';

type FieldsType = {
  acceptor: Acceptor;
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
    </Form>
  );
};
