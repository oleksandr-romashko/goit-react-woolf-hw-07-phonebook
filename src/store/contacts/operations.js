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
      if (error.response && error.response.status === 404) {
        // workaroung mockapi 404 error when empty sub endpoint = no contacts
        thunkAPI.dispatch(setContactsAction([]));
        return;
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
 * Fetches all contacts.
 */
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    const prepareResult = await prepareRequestUser(
      thunkAPI.dispatch,
      thunkAPI.getState
    );

    // do not proceed if failed with request preparation
    if (prepareResult !== true) {
      return thunkAPI.rejectWithValue(prepareResult);
    }

    try {
      const { id: userId } = thunkAPI.getState().user;
      const response = await api.get(`users/${userId}/contacts`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // workaroung mockapi 404 error when empty sub endpoint = no contacts
        return thunkAPI.fulfillWithValue([]);
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
 * Adds single contact to the list.
 */
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      // Prepare request and handle possible rejection
      const prepareResult = await prepareRequestUser(
        thunkAPI.dispatch,
        thunkAPI.getState
      );
      if (prepareResult?.payload) {
        // If prepareRequestUser returned an error payload, exit early
        return thunkAPI.rejectWithValue(prepareResult.payload);
      }

      // Synchronize contacts
      await thunkAPI.dispatch(syncContacts());

      // Check if contact absent in the list of contacts
      const { items: currentContacts } = thunkAPI.getState().contacts;
      if (currentContacts.find(el => el.name === name)) {
        return thunkAPI.rejectWithValue(
          `Contact '${name}' already exists in the list`
        );
      }

      // Get the user ID from the state
      const { id: userId } = thunkAPI.getState().user;

      // Add the contact
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
  async (contactId, thunkAPI) => {
    try {
      // Prepare request and handle possible rejection
      const prepareResult = await prepareRequestUser(
        thunkAPI.dispatch,
        thunkAPI.getState
      );
      if (prepareResult?.payload) {
        // If prepareRequestUser returned an error payload, exit early
        return thunkAPI.rejectWithValue(prepareResult.payload);
      }

      // Synchronize contacts
      await thunkAPI.dispatch(syncContacts());

      // Check if contacts is present in the list of contacts
      const { items: currentContacts } = thunkAPI.getState().contacts;
      if (!currentContacts.some(contact => contact.id === String(contactId))) {
        return thunkAPI.rejectWithValue(
          'Contact is not in the list of contacts. It may have never been there or might have been deleted previously.'
        );
      }

      // Get the user ID from the state
      const { id: userId } = thunkAPI.getState().user;

      // Delete the contact
      const response = await api.delete(
        `users/${userId}/contacts/${contactId}`
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return thunkAPI.rejectWithValue('Contact not found. Unable to delete.');
      } else {
        const errorMessage = error.response
          ? `${error.response.status} ${error.response.statusText}`
          : error.message;
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
    const { status: profileDeleteStatus } = thunkAPI.getState().profile;
    if (profileDeleteStatus) {
      return {
        empty: 'Your profile has already been deleted.',
      };
    }

    // Prepare request and handle possible rejection
    const prepareResult = await prepareRequestUser(
      thunkAPI.dispatch,
      thunkAPI.getState
    );
    if (prepareResult?.payload) {
      // If prepareRequestUser returned an error payload, exit early
      return thunkAPI.rejectWithValue(prepareResult.payload);
    }

    // Synchronize contacts
    await thunkAPI.dispatch(syncContacts());

    // Get the user ID from the state
    const { id: userId } = thunkAPI.getState().user;

    // Function to delete a single contact with retry logic
    const deleteContact = async (contact, index) => {
      try {
        // Delay added to avoid 429 errors
        await new Promise(resolve => setTimeout(resolve, 300 * index));
        await api.delete(`/users/${userId}/contacts/${contact.id}`);
        return { status: 'fulfilled', contact };
      } catch (error) {
        throw new Error(
          error.response?.status === 429
            ? 'Ouch. Our system is under too much stress. ' +
              'Some contacts may not have been deleted. ' +
              'Please refresh this page and try to delete all data again later.'
            : error.message
        );
      }
    };

    // Create array of delete promises
    const deletePromises = contactsToDelete.map((contact, index) =>
      deleteContact(contact, index)
    );

    try {
      // Wait for all promises to settle
      const results = await Promise.all(deletePromises);

      // Process results
      const fulfilled = results.filter(result => result.status === 'fulfilled');
      const rejected = results.filter(result => result.status === 'rejected');

      return { fulfilled, rejected };
    } catch (error) {
      // If any promise fails, process errors
      const errorMessage =
        error.message || 'An error occurred while deleting contacts.';
      return thunkAPI.rejectWithValue({
        status: 'rejected',
        message: errorMessage,
      });
    } finally {
      // synch contacts changes
      await thunkAPI.dispatch(syncContacts());
    }
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

    // Compare each property of the arrays
    return (
      currentContact.id === fetchedContact.id &&
      currentContact.name === fetchedContact.name &&
      currentContact.number === fetchedContact.phone_number
    );
  });
};
