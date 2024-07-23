import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContactById,
  deleteContacts,
} from './operations';

export const contactsRequestStatus = Object.freeze({
  addContact: {
    pending: 'addContact/inProgress',
    successful: 'addContact/successful',
    failed: 'addContact/failed',
  },
  deleteContact: {
    pending: 'deleteContact/inProgress',
    failed: 'deleteContact/failed',
  },
  deleteAllContacts: {
    pending: 'deleteContacts/inProgress',
    successful: 'deleteContacts/successful',
    failed: 'deleteContacts/failed',
  },
});

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: null,
    loading: false,
    error: null,
    info: null,
  },
  reducers: {
    setContactsAction: {
      prepare: data => {
        const contacts = data.map(el => ({
          id: el.id,
          name: el.name,
          number: el.phone_number,
        }));
        return { payload: contacts };
      },
      reducer: (state, action) => {
        state.items = action.payload;
      },
    },
    rejectContactAddWhenExistsAction(state, action) {
      state.status = contactsRequestStatus.addContact.failed;
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = null;
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload.map(({ id, name, phone_number }) => ({
          id,
          name,
          number: phone_number,
        }));
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(addContact.pending, state => {
        state.status = contactsRequestStatus.addContact.pending;
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = contactsRequestStatus.addContact.successful;
        const { id, name, phone_number: number } = action.payload;
        state.items.push({
          id,
          name,
          number,
        });
        state.isLoadingFormBtn = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = contactsRequestStatus.addContact.failed;
        state.error = action.payload;
        state.isLoadingFormBtn = false;
      })

      .addCase(deleteContactById.pending, (state, action) => {
        state.status = contactsRequestStatus.deleteContact.pending;
        state.loading = { id: action.meta.arg };
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        const index = state.items.findIndex(el => el.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(deleteContactById.rejected, (state, action) => {
        state.status = contactsRequestStatus.deleteContact.failed;
        state.error = {
          contactId: action.meta.arg,
          message: action.payload,
        };
      })

      .addCase(deleteContacts.pending, state => {
        state.status = contactsRequestStatus.deleteAllContacts.pending;
        state.loading = true;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.status = contactsRequestStatus.deleteAllContacts.successful;
        state.info = action.payload;
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.status = contactsRequestStatus.deleteAllContacts.failed;
        state.error = {
          message: action.payload,
        };
      })

      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.error = null;
          state.info = null;
        }
      )
      .addMatcher(
        action =>
          action.type.endsWith('/fulfilled') &&
          !action.type.includes('syncContacts'),
        state => {
          state.loading = false;
        }
      )
      .addMatcher(
        action =>
          action.type.endsWith('/rejected') &&
          !action.type.includes('syncContacts'),
        state => {
          state.loading = false;
        }
      );
  },
});

export const { setContactsAction, rejectContactAddWhenExistsAction } =
  contactsSlice.actions;

export default contactsSlice.reducer;
