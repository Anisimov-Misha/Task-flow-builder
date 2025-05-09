import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from '../toogle/toggleSlice';
import inputValueReducer from '../inputValue/inputValueSlice';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    input: inputValueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;