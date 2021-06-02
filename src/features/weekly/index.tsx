import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWeeklyTimesheet, selectedWeekStart, selectWeekState, selectWeekMinMaxHours } from './_slice';
import { currentEmployee, selectProjectColours } from '../layout/_slice';
import App from './canvas/App';
import { POPUP_HEIGHT, POPUP_WIDTH } from '../../const';
import { IGaugeProfile } from '../../types';

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
  const [start, end] = useAppSelector(selectWeekMinMaxHours);
  const projectColours = useAppSelector(selectProjectColours);

  // Watch and fetch new data
  useEffect(() => {
    if (employee && weekStart) {
      dispatch(fetchWeeklyTimesheet({ employee, weekStart }));
    }
  }, [employee, weekStart, dispatch]);

  console.log('App render', start, end);

  const gaugeProfile: IGaugeProfile = {
    diameter: 0.5,
    segmentPadding: 0.05,
    range: {
      start,
      end,
    },
  };

  return (
    <Wrapper>
      <App weekly={weekly} gaugeProfile={gaugeProfile} projectColours={projectColours} />
    </Wrapper>
  );
};

export default Dashboard;
