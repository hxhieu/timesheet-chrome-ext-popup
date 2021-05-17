import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '../../hooks';
import { ActionNames } from '../../store';

const Wrapper = styled.div``;

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  dispatch({
    type: ActionNames.weeklySetWeek,
  });
  return <Wrapper />;
};

export default Dashboard;
