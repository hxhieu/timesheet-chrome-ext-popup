import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeeklyTimesheet, selectedWeekStart, selectWeekState } from './_slice';
import { currentEmployee } from '../layout/_slice';
import App from './canvas/App';
import { POPUP_HEIGHT, POPUP_WIDTH } from '../../const';

const Wrapper = styled.div`
  background: #fff;
  width: ${POPUP_WIDTH}px;
  height: ${POPUP_HEIGHT}px;
`;

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const weekStart = useAppSelector(selectedWeekStart);
  const employee = useAppSelector(currentEmployee);
  const weekly = useAppSelector(selectWeekState);

  // Watch and fetch new data
  useEffect(() => {
    if (employee && weekStart) {
      dispatch(fetchWeeklyTimesheet({ employee, weekStart }));
    }
  }, [employee, weekStart, dispatch]);

  console.log('App render');

  return (
    <Wrapper>
      <App weekly={weekly} />
    </Wrapper>
  );
};

export default Dashboard;
