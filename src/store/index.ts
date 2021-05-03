import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ITimesheet } from '../types';
import rootReducer from './reducers';

interface Action {
  type: string;
  payload: any;
}

interface WeeklyTimesheetState {
  [key: string]: ITimesheet;
}

export { Action, WeeklyTimesheetState };

export default () => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  return createStore(rootReducer, composedEnhancers);
};
