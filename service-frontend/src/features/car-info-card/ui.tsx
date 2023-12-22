import { FC, ReactNode } from 'react';

import { Descriptions, Typography } from 'antd';

import { CarInfoCardProps } from './types';
import { carInfoFields } from './consts';

const CarInfoCard: FC<CarInfoCardProps> = ({ carInfo }) => {
  const content = carInfoFields.map((item) => {
    let children: ReactNode = null;
    if (item.key === 'engine') children = `${carInfo.engine.model} ${carInfo.engine.engine_vol}`;
    else children = carInfo[item.key];

    return { ...item, children };
  });

  return (
    <Descriptions
      title={<Typography.Title level={3}>{carInfo.car_model.model}</Typography.Title>}
      items={content}
    />
  );
};

export default CarInfoCard;
