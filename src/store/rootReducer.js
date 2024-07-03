import { combineReducers } from '@reduxjs/toolkit';
import contactsReducer from "./contacts/slice";
import filterReducer from "./filter/slice";

/**
 * Combines reducer functions into a single combined reducer function.
 */
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export default rootReducer;