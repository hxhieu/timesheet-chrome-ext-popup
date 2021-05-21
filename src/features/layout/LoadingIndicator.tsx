import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  loadingText?: string;
}

const LoadingIndicator = ({ loadingText }: Props): JSX.Element => {
  return <Wrapper>{loadingText || 'Please wait...'}</Wrapper>;
};

export default LoadingIndicator;
