import { FC, useLayoutEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { useStore } from 'app/store';
import { RegistrationForRepairsForm } from 'widgets';

import { Space, Spin, Typography } from 'antd';

const RegistrationForRepairs: FC = () => {
  const { carId } = useParams();

  const { profile } = useStore();

  const [loading, setLoading] = useState(false);

  if (!carId) throw new Error('No car ID found');

  useLayoutEffect(() => {
    if (profile.carsLoadingStatus === 'not_loaded') {
      setLoading(true);
      profile.getCars().finally(() => setLoading(false));
    }
  }, [profile]);

  const auto = profile.carsInfo.find((car) => car.id === Number(carId));

  if (profile.carsLoadingStatus === 'loading' && !auto) {
    throw new Error('Car not found');
  }

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Title>Registration for repairs</Typography.Title>
        {profile.carsLoadingStatus === 'idle' && <RegistrationForRepairsForm />}
      </Space>
    </Spin>
  );
};

export default observer(RegistrationForRepairs);
