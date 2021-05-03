import React from 'react';
import styled from '@emotion/styled';

import { useAuth, useEnv } from '../hooks';
import LoadingIndicator from '../components/LoadingIndicator';
import Login from '../components/Login';

const Container = styled.div`
  padding: 20px;
  width: 400px;
`;

const Popup = (): JSX.Element => {
  const [auth, busy] = useAuth();
  const { timesheetUrl } = useEnv();
  return (
    <Container>
      {busy && <LoadingIndicator>Please wait...</LoadingIndicator>}
      {!busy && !auth && <Login loginUrl={timesheetUrl} />}
    </Container>
  );
};

export default Popup;
