import { FC, useLayoutEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from 'app/store';
import { CarsList } from 'widgets';

import { Space, Spin, Typography } from 'antd';

const CarsPage: FC = () => {
  const { t } = useTranslation();
  const { profile } = useStore();

  const initialRender = useRef(true);

  useLayoutEffect(() => {
    if (profile.carsInfo.length === 0 && initialRender.current) {
      profile.getCars();
      initialRender.current = false;
    }
  }, [profile]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Spin spinning={profile.loadingStatus === 'loading'}>
        {profile.carsInfo.length > 0 && <Typography.Title>{t('Your cars:')}</Typography.Title>}
        <CarsList />
      </Spin>
    </Space>
  );
};

export default observer(CarsPage);
