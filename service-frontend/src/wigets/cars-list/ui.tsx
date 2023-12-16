import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from 'app/store';
import { Button, Flex, Typography } from 'antd';

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

  useEffect(() => {
    if (profile.carsInfo.length === 0) {
      profile.getCars();
    }
  }, [profile]);

  if (profile.carsInfo.length === 0) {
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

  return <></>;
};

export default observer(CarsList);
