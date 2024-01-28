import { ScheduleItem } from 'entities';
import { FC } from 'react';
import { getFullName } from 'shared/helpers';
import { TIMES } from './consts';

type ScheduleProps = {
  items: RegistrationForRepairs[];
};

const ScheduleList: FC<ScheduleProps> = ({ items }) => {
  return TIMES.map((time) => {
    const currentItem = items.find((item) => item.time.slice(0, 5) === time);

    if (currentItem) {
      return (
        <ScheduleItem
          user={getFullName(currentItem.acceptor)}
          car={currentItem.car.car_model.model}
          key={currentItem.id}
        />
      );
    }

    return undefined;
  });
};

export default ScheduleList;
