import { configureStore } from '@reduxjs/toolkit';
import diagramSlice from '../features/diagramSlice/diagramSlice';

export const store = configureStore({
  reducer: {
    diagrams: diagramSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
