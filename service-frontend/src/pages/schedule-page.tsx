import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Schedule } from 'widgets';

import { Space, Typography } from 'antd';
import { registrationForRepairsState } from 'features';

const SchedulePage: FC = () => {
  const { t } = useTranslation();

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) initialRender.current = false;
    else {
      return () => {
        if (!initialRender.current) registrationForRepairsState.clearStore();
      };
    }
    return undefined;
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Typography.Title>{t('Schedule')}</Typography.Title>
      <Schedule />
    </Space>
  );
};

export default SchedulePage;
