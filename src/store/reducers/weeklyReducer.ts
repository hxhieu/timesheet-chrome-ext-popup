import { Action, WeeklyTimesheetState } from '..';

export default (state: WeeklyTimesheetState, action: Action) => {
  switch (action.type) {
    case 'SET_WEEKLY':
      break;
  }
  return {
    ...state,
  };
};
