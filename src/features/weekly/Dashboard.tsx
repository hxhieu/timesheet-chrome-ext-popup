import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeeklyTimesheet, selectedWeek, setWeeklyWeek, isBusy } from './_slice';
import { currentEmployee } from '../layout/_slice';
import LoadingIndicator from '../layout/LoadingIndicator';
import DayGauge from './DayGauge';
import { Strings } from '../../types';
import { formatDate, getWeekDays } from '../../utils/date';

const Wrapper = styled.div``;

const Dashboard = (): JSX.Element => {
  const { dateFormat } = Strings;
  const dispatch = useAppDispatch();
  const weekStart = useAppSelector(selectedWeek);
  const employee = useAppSelector(currentEmployee);
  const busy = useAppSelector(isBusy);

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

  return busy ? (
    <LoadingIndicator loadingText="Fetching your timesheet..." />
  ) : (
    <Wrapper>
      {days.map((d) => (
        <DayGauge key={d} date={d} />
      ))}
    </Wrapper>
  );
};

export default Dashboard;
