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
    if (profile.carsInfo.length === 0) {
      setLoading(true);
      profile.getCars().finally(() => setLoading(false));
    }
  }, [profile]);

  const auto = profile.carsInfo.find((car) => car.id === Number(carId));

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Title>
          {!loading && `Registration for repairs ${auto?.car_model.model} ${auto?.number}`}
        </Typography.Title>
        <RegistrationForRepairsForm />
      </Space>
    </Spin>
  );
};

export default observer(RegistrationForRepairs);
