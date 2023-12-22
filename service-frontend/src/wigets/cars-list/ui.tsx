import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { Button, Flex, Typography } from 'antd';
import { CarInfoCard } from 'features';

const style = {
  fontSize: '2rem',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const CarsList: FC = () => {
  const navigate = useNavigate();
  const { profile } = useStore();

  if (profile.carsInfo.length === 0 && profile.loadingStatus === 'idle') {
    return (
      <Flex vertical align="center" justify="center" style={{ marginTop: '20%' }}>
        <Typography.Text style={style}>You don't have a car yet.</Typography.Text>
        <Typography.Text style={style}>
          Want to{' '}
          <Button type="primary" onClick={() => navigate('new')}>
            add
          </Button>{' '}
          ?
        </Typography.Text>
      </Flex>
    );
  }

  return (
    <Flex gap="large">
      {profile.carsInfo.map((item) => (
        <CarInfoCard key={item.id} carInfo={item} />
      ))}
    </Flex>
  );
};

export default observer(CarsList);
