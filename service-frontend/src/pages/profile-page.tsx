import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { UserProfile } from 'wigets';

import { Space, Typography } from 'antd';

const ProfilePage: FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>Profile</Typography.Title>
      <UserProfile />
    </Space>
  );
};

export default observer(ProfilePage);
