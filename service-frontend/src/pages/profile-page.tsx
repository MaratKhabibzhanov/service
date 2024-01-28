import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { UserProfile } from 'widgets';

import { Space, Typography } from 'antd';

const ProfilePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>{t('Profile')}</Typography.Title>
      <UserProfile />
    </Space>
  );
};

export default observer(ProfilePage);
