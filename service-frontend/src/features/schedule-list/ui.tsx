import { ScheduleItem } from 'entities';
import { FC } from 'react';

type ScheduleProps = {
  items: { user: string; car: string }[];
};

const ScheduleList: FC<ScheduleProps> = ({ items }) => {
  return items.map((item) => (
    <ScheduleItem user="user" car="car" key={`${item.user}${item.car}`} />
  ));
};

export default ScheduleList;
