import { FC } from 'react';

import { Space, Typography } from 'antd';
import { RegistrationForRepairsForm } from 'widgets';

const RegistrationForRepairs: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>Registration for repairs</Typography.Title>
      <RegistrationForRepairsForm />
    </Space>
  );
};

export default RegistrationForRepairs;
