import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisclaimerModalOpen: true,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setIsDisclaimerModalOpen: (state, action) => {
      state.isDisclaimerModalOpen = action.payload;
    }
  }
});

export const {
  setIsDisclaimerModalOpen,
} = modalsSlice.actions;

export default modalsSlice.reducer;