import React from 'react';
import styled from '@emotion/styled';

import { useAuth } from '../hooks';
import { getEnv } from '../utils';
import LoadingIndicator from '../features/layout/LoadingIndicator';
import Login from '../features/layout/Login';
import Dashboard from '../features/weekly/Dashboard';

const Container = styled.div`
  padding: 20px;
  width: 400px;
`;

const Popup = (): JSX.Element => {
  const [auth, busy] = useAuth();
  const { timesheetUrl } = getEnv();
  return (
    <Container>{busy ? <LoadingIndicator /> : auth ? <Dashboard /> : <Login loginUrl={timesheetUrl} />}</Container>
  );
};

export default Popup;
