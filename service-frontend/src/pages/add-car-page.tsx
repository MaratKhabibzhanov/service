import { FC } from 'react';

import { AddCarForm } from 'wigets';

import { Space, Typography } from 'antd';

const AddCatPage: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>Select a car:</Typography.Title>
      <AddCarForm />
    </Space>
  );
};

export default AddCatPage;
