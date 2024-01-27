import { FC, ReactNode } from 'react';

import { Descriptions, Divider, Flex, Typography } from 'antd';

import { CarInfoCardProps } from './types';
import { carInfoFields } from './consts';

const DescriptionTitle: FC<{ title: string }> = ({ title }) => (
  <Typography.Title level={3}>{title}</Typography.Title>
);

const CarInfoCard: FC<CarInfoCardProps> = ({ carInfo }) => {
  const content = carInfoFields.map((item) => {
    let children: ReactNode = null;
    if (item.key === 'engine') children = `${carInfo.engine.model} ${carInfo.engine.engine_vol}`;
    else children = carInfo[item.key];

    return { ...item, children };
  });

  return (
    <Flex vertical>
      <Descriptions title={<DescriptionTitle title={carInfo.car_model.model} />} items={content} />
      <Divider />
    </Flex>
  );
};

export default CarInfoCard;
