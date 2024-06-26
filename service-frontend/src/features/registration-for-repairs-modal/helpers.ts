import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

export const createInitialData = (data?: RegistrationForRepairs): RegistrationFoeRepairsFields => {
  const time = data?.time
    ? dayjs().hour(+data.time.slice(0, 2)).minute(+data.time.slice(3, 5))
    : null;

  return {
    userId: data?.car.owner.id,
    car: data?.car ? data.car.id : undefined,
    acceptor: data?.acceptor?.id || undefined,
    day: data?.day ? dayjs(new Date(data.day)) : null,
    time,
    maintenance: data?.maintenance?.id || undefined,
  };
};
