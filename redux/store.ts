import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import toursReducer from './slices/toursSlice';
import bookingsReducer from './slices/bookingsSlice';
import wishlistReducer from './slices/wishlistSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tours: toursReducer,
    bookings: bookingsReducer,
    wishlist: wishlistReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;