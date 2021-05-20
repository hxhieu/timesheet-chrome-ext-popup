import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import weekly from './features/weekly/_slice';
import layout from './features/layout/_slice';

const isDev = process.env.NODE_ENV !== 'production';

const store = configureStore({
  reducer: {
    weekly,
    layout,
  },
  devTools: isDev,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (isDev) {
      middlewares.push(logger);
    }
    return middlewares;
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
