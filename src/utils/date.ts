import dayjs from 'dayjs';
import { Strings } from '../types';

// DayJs week start is Sun
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
  let m = segs[1] ? parseInt(segs[1], 10) / 60 : 0;
  if (round) return h++;
  return h + m;
};

const dayOfWeek = (date: string | dayjs.Dayjs): string => {
  let targetDay: dayjs.Dayjs;
  if (dayjs.isDayjs(date)) {
    targetDay = date;
  } else {
    targetDay = dayjs(date, Strings.dateFormat);
  }
  const dayIndex = targetDay.day();
  return dayNames[dayIndex];
};

export { getWeekDays, formatDate, toHourNumber, dayOfWeek };
