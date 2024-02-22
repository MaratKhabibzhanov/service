import { FC } from 'react';

import { getFullName } from 'shared/helpers';

import { cyan } from '@ant-design/colors';
import { Card, Typography } from 'antd';

type ScheduleItemProps = {
  data?: RegistrationForRepairs;
  onClick?: () => void;
  time: string;
};

const ScheduleItem: FC<ScheduleItemProps> = ({ data, onClick, time }) => {
  return (
    <Card
      style={{ width: 200, padding: 0, height: '80px', backgroundColor: data ? cyan[6] : '' }}
      hoverable={!!onClick}
      size="small"
      styles={{ body: { padding: '5px' } }}
      onClick={onClick}
    >
      <Typography>{time}</Typography>
      {data?.car && <Typography>{getFullName(data.car.owner)}</Typography>}
      {data?.car && <Typography>{data.car.car_model.model}</Typography>}
    </Card>
  );
};

export default ScheduleItem;
