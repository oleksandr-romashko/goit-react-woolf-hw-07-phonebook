import { combineReducers } from '@reduxjs/toolkit';
import applicationReducer from './application/slice';
import profileReducer from './profile/slice';
import userReducer from './user/slice';
import contactsReducer from './contacts/slice';
import filterReducer from './filter/slice';
import modalsReducer from './modals/slice';

/**
 * Combines reducer functions into a single combined reducer function.
 */
const rootReducer = combineReducers({
  application: applicationReducer,
  profile: profileReducer,
  user: userReducer,
  contacts: contactsReducer,
  filter: filterReducer,
  modals: modalsReducer,
});

export default rootReducer;
