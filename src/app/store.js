import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import appReducer from '../features/appSlice';
import controlsReducer from '../features/controls/controlsSlice';
import authReducer from '../features/auth/authSlice';
import homeReducer from '../features/home/homeSlice';
import aboutMeReducer from '../features/aboutMe/aboutMeSlice';
import contactMeReducer from '../features/contactMe/contactMeSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      app: appReducer,
      controls: controlsReducer,
      auth: authReducer,
      home: homeReducer,
      aboutMe: aboutMeReducer,
      portfolio: portfolioReducer,
      contactMe: contactMeReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });
};
