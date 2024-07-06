import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "./operations";

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addContactAction: {
      prepare: (data) => {
        const contact = {...data, id: Date.now()};
        return {payload: contact};
      },
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
    },
    deleteContactByIdAction: (state, action) => {
      const index = state.items.findIndex(contact => contact.id === action.payload);
      state.items.splice(index, 1);
    },
    fetchingInProgress(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload

          .toSorted((a, b) => {
            const lowercaseA = a.name.toLowerCase();
            const lowercaseB = b.name.toLowerCase();
          
            if (lowercaseA < lowercaseB) {
              return -1;
            } else if (lowercaseA > lowercaseB) {
              return 1;
            } else {
              return 0; 
            }
          })

          // .toSorted((a, b) => a.created_at - b.created_at)

          .map(({ name, phone_number, contact_id }) => ({
            id: contact_id,
            name,
            number: phone_number,
          }));
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  addContactAction, 
  deleteContactByIdAction,
  fetchingInProgress, 
  fetchingSuccess, 
  fetchingError
} = contactsSlice.actions;

export default contactsSlice.reducer;