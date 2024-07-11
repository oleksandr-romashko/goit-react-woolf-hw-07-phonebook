import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDisclaimerModalOpen: true,
  isUserProfileModalOpen: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setIsDisclaimerModalOpen: (state, action) => {
      state.isDisclaimerModalOpen = action.payload;
    },
    setIsUserProfileModalOpen: (state, action) => {
      state.isUserProfileModalOpen = action.payload;
    },
  },
});

export const { setIsDisclaimerModalOpen, setIsUserProfileModalOpen } =
  modalsSlice.actions;

export default modalsSlice.reducer;
