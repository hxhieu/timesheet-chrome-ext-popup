import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface LayoutState {
  busy: boolean;
  employee?: string;
  projectColour: {
    [key: number]: string;
  };
}

const initialState: LayoutState = {
  busy: false,
  // TODO: Read from a input box
  employee: 'hugh.hoang',
  projectColour: {
    // TODO: Read from somewhere?
    200041: '#000000',
    100726: '#ff00aa',
    100742: '#00ddff',
  },
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
export const selectProjectColours = (state: RootState) => state.layout.projectColour;
