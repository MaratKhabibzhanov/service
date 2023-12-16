import { FC } from 'react';

import { Descriptions } from 'antd';

import { CarInfoCardProps } from './types';
import { carInfoFields } from './consts';

const CarInfoCard: FC<CarInfoCardProps> = ({ carInfo }) => {
  const content = carInfoFields.map((item) => {
    let children = carInfo[item.key];
    if (item.key === 'engine') children = `${carInfo.engine.model} ${carInfo.engine.engine_vol}`;

    return { ...item, children };
  });

  return <Descriptions title={carInfo.car_model.model} items={content} />;
};

export default CarInfoCard;
