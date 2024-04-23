import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

export const checkIsActiveModal = (date: Dayjs | null, time: string) => {
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
