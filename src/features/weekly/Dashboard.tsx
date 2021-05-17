import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setWeeklyWeek, selectedWeek } from './weeklySlice';

const Wrapper = styled.div``;

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentWeek = useAppSelector(selectedWeek);

  if (!currentWeek) {
    const weekStart = dayjs(new Date()).startOf('week').format('DD-MM-YYYY');
    dispatch(setWeeklyWeek(weekStart));
  }

  useEffect(() => {
    console.log(currentWeek);
  }, [currentWeek]);

  return <Wrapper />;
};

export default Dashboard;
