import dayjs from 'dayjs';
import { Strings } from '../types';

const getWeekDays = (weekStart: string | dayjs.Dayjs): dayjs.Dayjs[] => {
  let startDay: dayjs.Dayjs;
  if (dayjs.isDayjs(weekStart)) {
    startDay = weekStart;
  } else {
    startDay = dayjs(weekStart, Strings.dateFormat);
  }

  let day = 0;
  const weekDays: dayjs.Dayjs[] = [];
  while (day < 7) {
    weekDays.push(startDay.add(day++, 'day'));
  }
  return weekDays;
};

const formatDate = (day: dayjs.Dayjs): string => day.format(Strings.dateFormat);

const toHourNumber = (hour: string, round = false) => {
  const segs = hour.split(':');
  let h = parseInt(segs[0], 10);
  if (round && segs.length === 2 && segs[1] && parseInt(segs[1], 10) > 0) h++;
  return h;
};

export { getWeekDays, formatDate, toHourNumber };
