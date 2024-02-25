import dayjs from 'dayjs';

export const createInitialData = (data?: RegistrationForRepairs): RegistrationFoeRepairsFields => {
  const time = data?.time
    ? dayjs()
        .set('hour', +data.time.slice(0, 2))
        .set('minute', +data.time.slice(3, 5))
        .set('second', 0)
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
