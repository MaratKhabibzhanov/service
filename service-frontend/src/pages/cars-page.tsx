import { FC, useLayoutEffect } from 'react';

import { useStore } from 'app/store';
import { CarsList } from 'wigets';

import { Space, Spin, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

const CarsPage: FC = () => {
  const { profile } = useStore();

  useLayoutEffect(() => {
    if (profile.carsInfo.length === 0) {
      profile.getCars();
    }
  }, [profile]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Spin spinning={profile.loadingStatus === 'loading'}>
        {profile.carsInfo.length > 0 && <Typography.Title>Your cars:</Typography.Title>}
        <CarsList />
      </Spin>
    </Space>
  );
};

export default observer(CarsPage);
