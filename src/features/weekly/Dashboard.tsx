import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeeklyTimesheet, selectedWeek, setWeeklyWeek, selectDayEntries } from './_slice';
import { currentEmployee } from '../layout/_slice';

const Wrapper = styled.div``;

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const weekStart = useAppSelector(selectedWeek);
  const employee = useAppSelector(currentEmployee);
  const entries = useAppSelector(selectDayEntries('17-05-2021'));

  // Watch and fetch new data
  useEffect(() => {
    if (employee && weekStart) {
      dispatch(fetchWeeklyTimesheet({ employee, weekStart }));
    }
  }, [employee, weekStart, dispatch]);

  // Default to current week on start
  useEffect(() => {
    if (!weekStart) {
      const currentWeek = dayjs(new Date()).startOf('week').format('DD-MM-YYYY');
      dispatch(setWeeklyWeek(currentWeek));
    }
  }, [weekStart, dispatch]);

  return <Wrapper />;
};

export default Dashboard;
