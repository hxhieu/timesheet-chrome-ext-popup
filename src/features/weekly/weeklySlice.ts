import { ActionNames, WeeklyTimesheetState } from '../../store';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { ITimesheet } from '../../types';

const initialState: WeeklyTimesheetState = {};

const setWeeklyTimesheet = createAction<{ [key: string]: ITimesheet }>(ActionNames.weeklySetRecords);
const setWeeklyWeek = createAction<string>(ActionNames.weeklySetWeek);

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setWeeklyTimesheet, (state, action) => {
      Object.keys(action.payload).forEach((x) => {
        state[x] = action.payload[x];
      });
    })
    .addCase(setWeeklyWeek, (state, action) => {
      state.selectedWeek = action.payload;
    });
});
