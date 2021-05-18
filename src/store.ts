import { configureStore } from '@reduxjs/toolkit';
import weekly from './features/weekly/_slice';
import layout from './features/layout/_slice';

const store = configureStore({
  reducer: {
    weekly,
    layout,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
