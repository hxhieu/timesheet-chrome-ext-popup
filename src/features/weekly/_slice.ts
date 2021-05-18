import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { normalize, schema } from 'normalizr';
import { RootState } from '../../store';
import { ITimesheet, Strings } from '../../types';
import { fetchEmployeeWeeklyTimesheet } from './_service';

interface DailyTimesheet {
  date: string;
  entries: number[];
}

interface WeeklyTimesheetState {
  busy: boolean;
  selectedWeek?: string;
  dates: {
    [key: string]: DailyTimesheet;
  };
  entries: {
    [key: number]: ITimesheet;
  };
}

const initialState: WeeklyTimesheetState = {
  busy: false,
  dates: {},
  entries: {},
};

const entryEntity = new schema.Entity(
  'entries',
  {},
  {
    idAttribute: 'TimesheetId',
  },
);

const dayEntity = new schema.Entity(
  'dates',
  {
    entries: [entryEntity],
  },
  {
    idAttribute: 'date',
  },
);

// Thunks
export const fetchWeeklyTimesheet = createAsyncThunk(
  'weekly/fetchWeeklyTimesheet',
  async ({ employee, weekStart }: { employee: string; weekStart: string }) => {
    const { dateFormat } = Strings;
    const weekStartDay = dayjs(weekStart, dateFormat);
    const result = await fetchEmployeeWeeklyTimesheet(employee, weekStart);

    // Enrich the result with dates
    const weeklyResult: any[] = [];
    for (let i = 0; i < result.length; i++) {
      weeklyResult.push({
        date: weekStartDay.add(i, 'day').format(dateFormat),
        entries: result[i],
      });
    }
    const normalized = normalize(weeklyResult, [dayEntity]);
    return normalized.entities;
  },
);

const weeklySlice = createSlice({
  name: 'weekly',
  initialState,
  reducers: {
    setWeeklyWeek: (state, action) => {
      state.selectedWeek = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeeklyTimesheet.pending, (state) => {
      state.busy = true;
    });
    builder.addCase(fetchWeeklyTimesheet.fulfilled, (state, action) => {
      state.busy = false;
      const { dates, entries } = action.payload;
      state.dates = dates;
      state.entries = entries;
    });
  },
});

// Reducer export
export default weeklySlice.reducer;

// Actions
export const { setWeeklyWeek } = weeklySlice.actions;

// Selector
export const selectedWeek = (state: RootState) => state.weekly.selectedWeek;
