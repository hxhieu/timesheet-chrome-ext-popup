import { ActionNames, WeeklyTimesheetState } from '..';
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState: WeeklyTimesheetState = {};

const setWeeklyTimesheet = createAction(ActionNames.weeklySet);

export default createReducer(initialState, (builder) => {
  builder.addCase(setWeeklyTimesheet, (state, action) => {
    console.log(action);
    console.log(state);
  });
});
