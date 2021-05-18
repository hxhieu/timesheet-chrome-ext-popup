import dayjs from 'dayjs';
import { Strings } from '../../types';
import { buildHttpClient } from '../../utils';

const fetchEmployeeWeeklyTimesheet = async (employee: string, weekStart: string) => {
  const { getAsync } = buildHttpClient();
  const { dateFormat } = Strings;
  const start = dayjs(weekStart, dateFormat);
  const requests = [];
  let currentDay = 0;
  while (currentDay < 7) {
    const nextDay = start.add(currentDay++, 'day').format(dateFormat);
    requests.push(getAsync(`/timesheet?login=${employee}&date=${nextDay}`));
  }
  return Promise.all(requests);
};

export { fetchEmployeeWeeklyTimesheet };
