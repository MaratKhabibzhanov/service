import { FC } from 'react';

import { EditCarForm } from 'wigets';

import { Space, Typography } from 'antd';

const EditCarPage: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>Select a car:</Typography.Title>
      <EditCarForm />
    </Space>
  );
};

export default EditCarPage;
