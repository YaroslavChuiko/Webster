import { configureStore, combineReducers } from '@reduxjs/toolkit';
import frameReducer from './slices/frame-slice';
import fontListReducer from './slices/font-list-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import stageObjectReducer from './slices/stage-object-slice';
import selectedObjectReducer from './slices/selected-objects-slice';
import authReducer from './slices/auth-slice';
import copiedObjectReducer from './slices/copied-objects-slice';
import { apiSlice } from './api/api-slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['selected', 'fontList', 'copied', 'api'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    frame: frameReducer,
    stage: stageObjectReducer,
    selected: selectedObjectReducer,
    auth: authReducer,
    fontList: fontListReducer,
    copied: copiedObjectReducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // immutableCheck: { warnAfter: 128 },
      immutableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
