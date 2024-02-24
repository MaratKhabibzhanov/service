import { Flex, Typography } from 'antd';
import { FC } from 'react';

// TODO: translate

const HomePage: FC = () => {
  return (
    <Flex align="center" justify="center">
      <Typography.Title style={{ width: '50%', textAlign: 'center', paddingTop: '100px' }}>
        Добро пожаловать на портал сервисного центра автомобилей "KIA"
      </Typography.Title>
    </Flex>
  );
};

export default HomePage;
