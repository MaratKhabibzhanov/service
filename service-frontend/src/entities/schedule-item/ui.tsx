import { Card, Typography } from 'antd';
import { FC } from 'react';
import { getFullName } from 'shared/helpers';

type ScheduleItemProps = {
  data?: RegistrationForRepairs;
  time: string;
};

const ScheduleItem: FC<ScheduleItemProps> = ({ data, time }) => {
  return (
    <Card
      style={{ width: 200, padding: 0, height: '80px' }}
      hoverable
      size="small"
      bodyStyle={{ padding: '5px' }}
    >
      <Typography>{time}</Typography>
      {data && <Typography>{getFullName(data.acceptor)}</Typography>}
      {data && <Typography>{data.car.car_model.model}</Typography>}
    </Card>
  );
};

export default ScheduleItem;
