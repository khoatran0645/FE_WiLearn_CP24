import rootReducers from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

// const store = createStore
  const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
