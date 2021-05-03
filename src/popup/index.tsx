import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Global, css } from '@emotion/react';
import { Provider } from 'react-redux';
import Popup from './Popup';
import configureStore from '../store';

const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
`;

chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
  const store = configureStore();
  ReactDOM.render(
    <>
      <Global styles={globalStyles} />
      <Provider store={store}>
        <Popup />
      </Provider>
    </>,
    document.getElementById('popup'),
  );
});
