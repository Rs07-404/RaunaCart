// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './slices/CartSlice.ts';

export const store = configureStore({
  reducer: {
    cart: CartReducer
  }
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
