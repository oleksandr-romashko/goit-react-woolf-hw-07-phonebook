import { combineReducers } from '@reduxjs/toolkit';
import persistentReducer from './persistent/slice';
import contactsReducer from './contacts/slice';
import filterReducer from './filter/slice';
import modalsReducer from './modals/slice';

/**
 * Combines reducer functions into a single combined reducer function.
 */
const rootReducer = combineReducers({
  persistent: persistentReducer,
  contacts: contactsReducer,
  filter: filterReducer,
  modals: modalsReducer
});

export default rootReducer;