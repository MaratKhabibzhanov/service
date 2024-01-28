import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Schedule } from 'widgets';

import { Space, Typography } from 'antd';

const SchedulePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>{t('Schedule')}</Typography.Title>
      <Schedule />
    </Space>
  );
};

export default SchedulePage;
