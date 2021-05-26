import React from 'react';
import styled from '@emotion/styled';

import { useAuth } from '../hooks';
import { getEnv } from '../utils';
import LoadingIndicator from '../features/layout/LoadingIndicator';
import Login from '../features/layout/Login';
import Dashboard from '../features/weekly';

const POPUP_WIDTH = 600;
const POPUP_HEIGHT = 400;

const Container = styled.div`
  width: ${POPUP_WIDTH};
  height: ${POPUP_HEIGHT};
`;

const Popup = (): JSX.Element => {
  const [auth, busy] = useAuth();
  const { timesheetUrl } = getEnv();
  return (
    <Container>{busy ? <LoadingIndicator /> : auth ? <Dashboard /> : <Login loginUrl={timesheetUrl} />}</Container>
  );
};

export { POPUP_WIDTH, POPUP_HEIGHT };
export default Popup;
