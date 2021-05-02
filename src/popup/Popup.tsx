import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  background: #f00;
  padding: 100px;
`;

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return <Container>Hello, world!!!</Container>;
}
