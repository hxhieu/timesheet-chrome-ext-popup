import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Global, css } from '@emotion/react';
import Popup from './Popup';

const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
`;

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  ReactDOM.render(
    <>
      <Global styles={globalStyles} />
      <Popup />
    </>,
    document.getElementById('popup'),
  );
});
