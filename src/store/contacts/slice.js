import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContactAction: {
      prepare: (data) => {
        const contact = {...data, id: Date.now()};
        return {payload: contact};
      },
      reducer: (state, action) => {
        state.push(action.payload);
      },
    },
    deleteContactByIdAction: (state, action) => {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  }
});

export const { 
  addContactAction, 
  deleteContactByIdAction,
} = contactsSlice.actions;

export default contactsSlice.reducer;