import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeeklyTimesheet, selectedWeek, setWeeklyWeek } from './_slice';
import { currentEmployee } from '../layout/_slice';

const Wrapper = styled.div``;

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const weekStart = useAppSelector(selectedWeek);
  const employee = useAppSelector(currentEmployee);

  // Watch and fetch new data
  useEffect(() => {
    dispatch(fetchWeeklyTimesheet({ employee, weekStart }));
  }, [weekStart, employee, dispatch]);

  // Default to current week on start
  const currentWeek = dayjs(new Date()).startOf('week').format('DD-MM-YYYY');
  dispatch(setWeeklyWeek(currentWeek));

  return <Wrapper />;
};

export default Dashboard;
