import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Schedule } from 'widgets';

import { Space, Typography } from 'antd';
import { registrationForRepairsState } from 'features';

const SchedulePage: FC = () => {
  const { t } = useTranslation();

  useEffect(() => registrationForRepairsState.clearStore(), []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>{t('Schedule')}</Typography.Title>
      <Schedule />
    </Space>
  );
};

export default SchedulePage;
