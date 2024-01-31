import { FC } from 'react';

import { getFullName } from 'shared/helpers';

import { cyan } from '@ant-design/colors';
import { Card, Typography } from 'antd';

type ScheduleItemProps = {
  data?: RegistrationForRepairs;
  time: string;
  onClick: () => void;
};

const ScheduleItem: FC<ScheduleItemProps> = ({ data, time, onClick }) => {
  return (
    <Card
      style={{ width: 200, padding: 0, height: '80px', backgroundColor: data?.id ? cyan[6] : '' }}
      hoverable={!!data?.day}
      size="small"
      bodyStyle={{ padding: '5px' }}
      onClick={data?.day ? onClick : undefined}
    >
      <Typography>{time}</Typography>
      {data?.acceptor && <Typography>{getFullName(data.acceptor)}</Typography>}
      {data?.car && <Typography>{data.car.car_model.model}</Typography>}
    </Card>
  );
};

export default ScheduleItem;
