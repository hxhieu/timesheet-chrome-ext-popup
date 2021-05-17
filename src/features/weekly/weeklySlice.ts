import { RootState, WeeklyTimesheetState } from '../../store';
import { createSlice } from '@reduxjs/toolkit';

const initialState: WeeklyTimesheetState = {};

const weeklySlice = createSlice({
  name: 'weekly',
  initialState,
  reducers: {
    setWeeklyWeek: (state, action) => {
      state.selectedWeek = action.payload;
    },
    setWeeklyTimesheet: (state, action) => {
      Object.keys(action.payload).forEach((x) => {
        state[x] = action.payload[x];
      });
    },
  },
});

// Reducer export
export default weeklySlice.reducer;

// Actions
export const { setWeeklyWeek, setWeeklyTimesheet } = weeklySlice.actions;

// Selector
export const selectedWeek = (state: RootState) => state.weekly.selectedWeek;
