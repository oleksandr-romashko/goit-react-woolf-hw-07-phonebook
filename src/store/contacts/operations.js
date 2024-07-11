import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'services/api';

/**
 * Fetches all contacts..
 */
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/contacts');
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
 * Adds single contacts.
 */
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
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
    try {
      const response = await api.delete(`/contacts/${id}`);
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
