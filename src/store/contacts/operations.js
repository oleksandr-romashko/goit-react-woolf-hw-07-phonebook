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
      if (
        error.response.status === 400 &&
        error.response.data ===
          'Max number of elements reached for this resource!'
      ) {
        const errorMessage =
          'Sorry, we currently support a maximum of 100 contacts';
        return thunkAPI.rejectWithValue(errorMessage);
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
  async (contactsToDelete, thunkAPI) => {
    prepareRequestUser(thunkAPI);
    // TODO: prepareReauestContacts() - check for contacts update

    if (!contactsToDelete.length) {
      // Return results to the reducer
      return {
        empty: 'It looks like there are no contacts to delete.',
      };
    }

    const deletePromises = contactsToDelete.map((contact, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            await api.delete(`/contacts/${contact.id}`);
            resolve({ status: 'fulfilled', contact });
          } catch (error) {
            if (error.response && error.response.status === 429) {
              thunkAPI.rejectWithValue({
                status: 'rejected',
                contact,
                message:
                  'Ouch. Our system is under too much stress. Some contacts may not have been deleted. Please refresh this page and try to delete all data again later.',
              });
            } else {
              thunkAPI.rejectWithValue({
                status: 'rejected',
                contact,
                message: error.message,
              });
            }
            reject({ status: 'rejected', contact, message: error.message });
          }
        }, 300 * index); // Adds delay not to fall into 429 'Too many requests' error.
      });
    });

    // Wait for all promises to settle
    const results = await Promise.all(deletePromises);

    // Process results
    const fulfilled = results.filter(result => result.status === 'fulfilled');
    const rejected = results.filter(result => result.status === 'rejected');

    // Return results to the reducer
    return { fulfilled, rejected };
  }
);
