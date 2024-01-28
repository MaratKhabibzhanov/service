import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Space, Typography } from 'antd';
import { Schedule } from 'features';

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
