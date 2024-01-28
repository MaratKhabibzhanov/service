import { Card, Typography } from 'antd';
import { FC } from 'react';

type ScheduleItemProps = {
  user: string;
  car: string;
};

const ScheduleItem: FC<ScheduleItemProps> = ({ user, car }) => {
  return (
    <Card style={{ width: 200, padding: 0 }} hoverable size="small" bodyStyle={{ padding: '5px' }}>
      <Typography>{user}</Typography>
      <Typography>{car}</Typography>
    </Card>
  );
};

export default ScheduleItem;
