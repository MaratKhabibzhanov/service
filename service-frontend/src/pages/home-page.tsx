import { Flex, Image } from 'antd';
import { FC } from 'react';

import background from 'shared/img/bg.webp';

const HomePage: FC = () => {
  return (
    <Flex style={{ padding: '40px' }} align="center" justify="center">
      <Image src={background} alt="background" preview={false} height={520} />
    </Flex>
  );
};

export default HomePage;
