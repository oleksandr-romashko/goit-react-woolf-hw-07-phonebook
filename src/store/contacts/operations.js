import { createAsyncThunk } from '@reduxjs/toolkit';
import { prepareRequestUser } from 'store/user/operations';
import api from 'services/api';
import { setContactsAction } from './slice';

/**
 * Fetches the contacts from the backend and updates the local state if there are discrepancies.
 */
export const syncContacts = createAsyncThunk(
  'contacts/syncContacts',
  async (_, thunkAPI) => {
    await prepareRequestUser(thunkAPI);

    // Get current contacts from app state
    const { items: currentContacts } = thunkAPI.getState().contacts;

    try {
      // Get contacts from backend
      const { id: userId } = thunkAPI.getState().user;
      const response = await api.get(`users/${userId}/contacts`);
      const fetchedContacts = response.data;

      // Compare the fetched contacts with the local contacts
      if (!areContactsEqual(currentContacts, fetchedContacts)) {
        thunkAPI.dispatch(setContactsAction(fetchedContacts));
      }
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
 * Fetches all contacts.
 */
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    await prepareRequestUser(thunkAPI);

    try {
      const { id: userId } = thunkAPI.getState().user;
      const response = await api.get(`users/${userId}/contacts`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return thunkAPI.rejectWithValue(
          "Looks like you haven't added any contacts yet."
        );
      }
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
    await prepareRequestUser(thunkAPI);
    await thunkAPI.dispatch(syncContacts());

    // check if contact absent in the list of contacts
    const { items: currentContacts } = thunkAPI.getState().contacts;
    if (currentContacts.find(el => el.name === name)) {
      return thunkAPI.rejectWithValue(
        `Contact ${name} already exists in the list.`
      );
    }

    try {
      const { id: userId } = thunkAPI.getState().user;
      const response = await api.post(`users/${userId}/contacts`, {
        name,
        phone_number: number,
      });
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data ===
          'Max number of elements reached for this resource!'
      ) {
        const errorMessage =
          'Sorry, we currently support a maximum of 100 contacts';
        return thunkAPI.rejectWithValue(errorMessage);
      }
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
    await prepareRequestUser(thunkAPI);
    await thunkAPI.dispatch(syncContacts());

    // check if contacts is present in the list of contacts
    const { items: currentContacts } = thunkAPI.getState().contacts;
    if (!currentContacts.some(el => el.id === String(id))) {
      return thunkAPI.rejectWithValue(
        'Contact is not in the list of contacts. It may have never been there or might have been deleted previously.'
      );
    }

    try {
      const { id: userId } = thunkAPI.getState().user;
      const response = await api.delete(`users/${userId}/contacts/${id}`);
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
    await prepareRequestUser(thunkAPI);
    await thunkAPI.dispatch(syncContacts());

    if (!contactsToDelete.length) {
      // Return results to the reducer
      return {
        empty: 'It looks like there are no contacts to delete.',
      };
    }

    const { id: userId } = thunkAPI.getState().user;

    const deletePromises = contactsToDelete.map((contact, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            await api.delete(`/users/${userId}/contacts/${contact.id}`);
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

    // synch contacts changes
    await thunkAPI.dispatch(syncContacts());

    // Process results
    const fulfilled = results.filter(result => result.status === 'fulfilled');
    const rejected = results.filter(result => result.status === 'rejected');

    // Return results to the reducer
    return { fulfilled, rejected };
  }
);

/**
 * Compares current state contacts arrays with fetched remote contacts array.
 * @param {object[]} currentContacts Current local contacts array in the state.
 * @param {object[]} fetchedContacts Contacts array obtained from server.
 * @returns {boolean} Result if arrays are equal.
 */
const areContactsEqual = (currentContacts, fetchedContacts) => {
  if (currentContacts.length !== fetchedContacts.length) {
    return false;
  }

  if (!currentContacts.length && !fetchedContacts.length) {
    return true;
  }

  // normalize data by Asc sorting by id for proper and effective cmparison
  currentContacts = currentContacts.toSorted(
    (a, b) => Number(a.id) - Number(b.id)
  );
  fetchedContacts = fetchedContacts.toSorted(
    (a, b) => Number(a.id) - Number(b.id)
  );

  return currentContacts.every((currentContact, index) => {
    const fetchedContact = fetchedContacts[index];

    // Compare each property
    return (
      currentContact.id === fetchedContact.id &&
      currentContact.name === fetchedContact.name &&
      currentContact.number === fetchedContact.phone_number
    );
  });
};
