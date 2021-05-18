import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface LayoutState {
  busy: boolean;
  employee?: string;
}

const initialState: LayoutState = {
  busy: false,
  // TODO: Read from a input box
  employee: 'hugh.hoang',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {},
});

// Reducer export
export default layoutSlice.reducer;

// Actions
// export const {} = shellSlice.actions;

// Selector
export const currentEmployee = (state: RootState) => state.layout.employee;
