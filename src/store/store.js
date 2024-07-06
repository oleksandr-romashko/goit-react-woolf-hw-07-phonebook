import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import rootReducer from './rootReducer';

const rootPersistConfig = {
  key: 'phonebook',
  storage,
  whitelist: [],
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

/**
 * A store that holds the whole state tree of the application.
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persistor = persistStore(store);

export default store;