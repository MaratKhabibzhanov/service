import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { EditCarForm } from 'wigets';

import { Space, Typography } from 'antd';

const EditCarPage: FC = () => {
  const { carId } = useParams();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>{carId === 'new' ? 'Adding a car:' : 'My car'}</Typography.Title>
      <EditCarForm />
    </Space>
  );
};

export default EditCarPage;
