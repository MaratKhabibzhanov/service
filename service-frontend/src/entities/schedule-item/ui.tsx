import { FC } from 'react';

import { getFullName } from 'shared/helpers';

import { cyan } from '@ant-design/colors';
import { Card, Typography } from 'antd';

type ScheduleItemProps = {
  data: RegistrationForRepairs;
  onClick: () => void;
};

const ScheduleItem: FC<ScheduleItemProps> = ({ data, onClick }) => {
  return (
    <Card
      style={{ width: 200, padding: 0, height: '80px', backgroundColor: data.id ? cyan[6] : '' }}
      hoverable={!!data.day}
      size="small"
      styles={{ body: { padding: '5px' } }}
      onClick={data.day ? onClick : undefined}
    >
      <Typography>{data.time}</Typography>
      {data.car && <Typography>{getFullName(data.car.owner)}</Typography>}
      {data.car && <Typography>{data.car.car_model.model}</Typography>}
    </Card>
  );
};

export default ScheduleItem;
