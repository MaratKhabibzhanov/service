import dayjs, { Dayjs } from 'dayjs';
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

export const checkAllowedSave = (date: Dayjs | null, time: string) => {
  let allowSave = true;

  if (!date) return true;

  // TODO: дата должна быть больше или равна дате сегодняшней
  if (!dayjs().isSameOrBefore(date, 'day')) allowSave = false;
  else if (dayjs().isSame(dayjs(date), 'day')) {
    const timeArray = time.split(':');

    // TODO: если выбранные часы меньше чем текущие
    if (dayjs().hour(+timeArray[0]).minute(+timeArray[1]).isBefore(dayjs(), 'hour')) {
      allowSave = false;
    }
  }

  return allowSave;
};
