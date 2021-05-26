import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeeklyTimesheet, selectedWeek, setWeeklyWeek } from './_slice';
import { currentEmployee } from '../layout/_slice';
import { Strings } from '../../types';
import { formatDate, getWeekDays } from '../../utils/date';
import App from './pc/App';

const Dashboard = (): JSX.Element => {
  const { dateFormat } = Strings;
  const dispatch = useAppDispatch();
  const weekStart = useAppSelector(selectedWeek);
  const employee = useAppSelector(currentEmployee);

  const [days, setDays] = useState<string[]>([]);

  // Default to current week on start
  useEffect(() => {
    if (!weekStart) {
      const start = dayjs(new Date()).startOf('week').format(dateFormat);
      dispatch(setWeeklyWeek(start));
    }
  }, [dispatch, weekStart, dateFormat]);

  // Watch and fetch new data
  useEffect(() => {
    if (employee && weekStart) {
      dispatch(fetchWeeklyTimesheet({ employee, weekStart }));
      setDays(getWeekDays(weekStart).map(formatDate));
    }
  }, [employee, weekStart, dispatch, dateFormat]);

  return <App />;
};

export default Dashboard;
