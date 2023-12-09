import { FC } from 'react';

import { CarsList } from 'wigets';

import { Space, Typography } from 'antd';

const CarsPage: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>Your cars:</Typography.Title>
      <CarsList />
    </Space>
  );
};

export default CarsPage;
