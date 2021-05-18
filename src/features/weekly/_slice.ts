import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ITimesheet } from '../../types';
import { fetchEmployeeWeeklyTimesheet } from './_service';

interface WeeklyTimesheetState {
  busy: boolean;
  selectedWeek?: string;
  ids: number[];
  entities: {
    [key: string]: ITimesheet;
  };
}

const initialState: WeeklyTimesheetState = {
  busy: false,
  ids: [],
  entities: {},
};

// Thunks
export const fetchWeeklyTimesheet = createAsyncThunk(
  'weekly/fetchWeeklyTimesheet',
  async ({ employee, weekStart }: { employee: string; weekStart?: string }) => {
    if (!weekStart || !employee) return [];
    return await fetchEmployeeWeeklyTimesheet(employee, weekStart);
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchWeeklyTimesheet.pending, (state) => {
      state.busy = true;
    });
    builder.addCase(fetchWeeklyTimesheet.fulfilled, (state, action) => {
      state.busy = false;
      console.log(action.payload);
    });
  },
});

// Reducer export
export default weeklySlice.reducer;

// Actions
export const { setWeeklyWeek, setWeeklyTimesheet } = weeklySlice.actions;

// Selector
export const selectedWeek = (state: RootState) => state.weekly.selectedWeek;
