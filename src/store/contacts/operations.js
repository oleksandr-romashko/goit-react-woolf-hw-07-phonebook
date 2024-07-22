import { createAsyncThunk } from '@reduxjs/toolkit';
import { prepareRequestUser } from 'store/user/operations';
import api from 'services/api';

/**
 * Fetches all contacts.
 */
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    prepareRequestUser(thunkAPI);
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        return thunkAPI.rejectWithValue(
          "We couldn't find your contact list. Unable to load."
        );
      } else {
        const errorMessage =
          (error.response &&
            error.response.status + ' ' + error.response.statusText) ||
          error.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

/**
 * Adds single contacts.
 */
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    prepareRequestUser(thunkAPI);
    // TODO: prepareReauestContacts() - check for contacts update
    try {
      const response = await api.post('/contacts', {
        name,
        phone_number: number,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.status + ' ' + error.response.statusText) ||
        error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/**
 * Deletes single contact by its id.
 */
export const deleteContactById = createAsyncThunk(
  'contacts/deleteContactById',
  async (id, thunkAPI) => {
    prepareRequestUser(thunkAPI);
    // TODO: prepareReauestContacts() - check for contacts update
    try {
      const response = await api.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        return thunkAPI.rejectWithValue('Contact not found. Unable to delete.');
      } else {
        const errorMessage =
          (error.response &&
            error.response.status + ' ' + error.response.statusText) ||
          error.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

/**
 * Deletes all contacts.
 */
export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (contacts, thunkAPI) => {
    prepareRequestUser(thunkAPI);
    // TODO: prepareReauestContacts() - check for contacts update
    console.log('contacts :>> ', contacts);
    try {
      const results = Promise.allSettled(
        contacts.map(({ id }) => api.delete(`/contacts/${id}`))
      ).then(result => console.log(result));
      console.log('results :>> ', results);
    } catch (error) {
      if (error.response.status === 404) {
        return thunkAPI.rejectWithValue(
          'Contacts or User not found. Unable to delete.'
        );
      } else {
        const errorMessage =
          (error.response &&
            error.response.status + ' ' + error.response.statusText) ||
          error.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);
