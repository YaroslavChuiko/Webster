import { Middleware } from '@reduxjs/toolkit';
import { logout } from '../slices/auth-slice';

export const checkAuth: Middleware = (store) => (next) => (action) => {
  if (action.error && action.payload?.statusCode === 403) {
    // Handle 403 Forbidden errors
    store.dispatch(logout());
  }

  return next(action);
};
