import { FC } from 'react';

import { Space, Typography } from 'antd';

const AddCatPage: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>Select a car</Typography.Title>
    </Space>
  );
};

export default AddCatPage;
