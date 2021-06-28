import { buildHttpClient } from '../../utils';
import { formatDate, getWeekDays } from '../../utils/date';

const fetchEmployeeWeeklyTimesheet = async (employee: string, weekStart: string) => {
  const { getAsync } = buildHttpClient();
  const days = getWeekDays(weekStart).map(formatDate);
  const requests = [];
  for (const date of days) {
    requests.push(getAsync(`/timesheet?login=${employee}&date=${date}`));
  }
  return Promise.all(requests);
};

export { fetchEmployeeWeeklyTimesheet };
