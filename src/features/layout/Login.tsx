import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    margin: 10px 0;
    padding: 0;
  }
`;

interface Props {
  loginUrl: string;
}

const Login = ({ loginUrl }: Props): JSX.Element => {
  return (
    <Wrapper>
      <p>You are not logged in</p>
      <p>
        Go to{' '}
        <a href={loginUrl} target="_blank">
          Timesheet
        </a>{' '}
        and login first
      </p>
    </Wrapper>
  );
};

export default Login;
