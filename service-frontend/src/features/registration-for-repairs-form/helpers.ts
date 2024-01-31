import dayjs from 'dayjs';
import { getCarTitle } from 'shared/helpers';

export const createInitialData = (data?: RegistrationForRepairs): RegistrationFoeRepairsFields => {
  const time = data?.time
    ? dayjs()
        .set('hour', +data.time.slice(0, 2))
        .set('minute', +data.time.slice(3, 5))
        .set('second', 0)
    : null;

  return {
    car: data?.car ? { label: getCarTitle(data.car), value: data.car.id } : undefined,
    acceptor: data?.acceptor?.id || undefined,
    day: data?.day ? dayjs(new Date(data.day)) : null,
    time,
    maintenance: data?.maintenance?.id || undefined,
  };
};
