import { FC } from 'react';

import { useStore } from 'app/store';
import { CarsList } from 'wigets';

import { Space, Typography } from 'antd';

const CarsPage: FC = () => {
  const { profile } = useStore();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {profile.carsInfo.length > 0 && <Typography.Title>Your cars:</Typography.Title>}
      <CarsList />
    </Space>
  );
};

export default CarsPage;
