import { configureStore } from '@reduxjs/toolkit';

import { ITimesheet } from '../types';
import { ActionNames } from './actionNames';
import weeklyReducer from './reducers/weeklyReducer';

interface Action {
  type: ActionNames;
  payload: any;
}

interface WeeklyTimesheetState {
  selectedWeek?: string;
  records?: {
    [key: string]: ITimesheet;
  };
}

const store = configureStore({
  reducer: {
    weekly: weeklyReducer,
  },
});

export default store;
export { Action, WeeklyTimesheetState };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export { ActionNames };
