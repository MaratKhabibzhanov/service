import { FC } from 'react';

import { Space, Typography } from 'antd';
import { RegistrationForm } from 'widgets';

const RegistrationPage: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>Registration</Typography.Title>
      <RegistrationForm />
    </Space>
  );
};

export default RegistrationPage;
