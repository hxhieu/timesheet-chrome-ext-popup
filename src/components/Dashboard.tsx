import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useHttpClient } from '../hooks/useHttpClient';

const Wrapper = styled.div``;

const Dashboard = (): JSX.Element => {
  const { getAsync } = useHttpClient();
  return <Wrapper />;
};

export default Dashboard;
