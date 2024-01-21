import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { RemoveCarButton } from 'features';
import { CarInfoCard } from 'entities';

import { Button, Flex, Space, Typography } from 'antd';

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
    <Flex gap="large" vertical>
      {profile.carsInfo.map((item) => (
        <Flex key={item.id} gap="20px">
          <CarInfoCard carInfo={item} />
          <Flex vertical justify="space-between" align="end" style={{ paddingTop: '26px' }}>
            <Button onClick={() => navigate(`/registration_for_repairs/${item.id}`)}>
              Registration for repairs
            </Button>
            <RemoveCarButton carId={item.id} />
          </Flex>
        </Flex>
      ))}
      <Button style={{ alignSelf: 'flex-start' }} type="primary" onClick={() => navigate('new')}>
        Add car
      </Button>
    </Flex>
  );
};

export default observer(CarsList);