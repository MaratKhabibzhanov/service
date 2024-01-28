import { ScheduleItem } from 'entities';
import { FC } from 'react';
import { getFullName } from 'shared/helpers';

type ScheduleProps = {
  items: RegistrationForRepairs[];
};

const ScheduleList: FC<ScheduleProps> = ({ items }) => {
  return items.map((item) => (
    <ScheduleItem user={getFullName(item.acceptor)} car={item.car.car_model.model} key={item.id} />
  ));
};

export default ScheduleList;
