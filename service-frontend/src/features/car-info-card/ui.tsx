import { FC } from 'react';

import { Descriptions } from 'antd';

import { CarInfoCardProps } from './types';
import { carInfoFields } from './consts';

const CarInfoCard: FC<CarInfoCardProps> = ({ carInfo }) => {
  const content = carInfoFields.map((item) => {
    if (item.key === 'engine') return `${carInfo.engine.model} ${carInfo.engine.engine_vol}`;

    return carInfo[item.key];
  });

  return <Descriptions title={carInfo.car_model.model} items={content} />;
};

export default CarInfoCard;
