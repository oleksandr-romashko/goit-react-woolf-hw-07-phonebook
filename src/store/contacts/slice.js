import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContactById,
  deleteContacts,
} from './operations';

export const requestStatus = Object.freeze({
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
  },
  reducers: {
    rejectContactAddWhenExistsAction(state, action) {
      state.status = requestStatus.addContact.failed;
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
        state.status = requestStatus.addContact.pending;
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = requestStatus.addContact.successful;
        const { id, name, phone_number: number } = action.payload;
        state.items.push({
          id,
          name,
          number,
        });
        state.isLoadingFormBtn = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = requestStatus.addContact.failed;
        state.error = action.payload;
        state.isLoadingFormBtn = false;
      })

      .addCase(deleteContactById.pending, (state, action) => {
        state.status = requestStatus.deleteContact.pending;
        state.loading = { id: action.meta.arg };
      })
      .addCase(deleteContactById.fulfilled, (state, action) => {
        const index = state.items.findIndex(el => el.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(deleteContactById.rejected, (state, action) => {
        state.status = requestStatus.deleteContact.failed;
        state.error = {
          contactId: action.meta.arg,
          message: action.payload,
        };
      })

      .addCase(deleteContacts.pending, (state, action) => {
        state.status = requestStatus.deleteAllContacts.pending;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.status = requestStatus.deleteAllContacts.successful;
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.status = requestStatus.deleteAllContacts.failed;
      })

      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.loading = false;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        state => {
          state.loading = false;
        }
      );
  },
});

export const { rejectContactAddWhenExistsAction } = contactsSlice.actions;

export default contactsSlice.reducer;
