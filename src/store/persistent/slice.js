import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doNotShowDisclaimer: false,
};

const persistentSlice = createSlice({
  name: 'persistent',
  initialState,
  reducers: {
    setShowDisclaimerAgain: (state, action) => {
      state.doNotShowDisclaimer = action.payload;
    },
  },
});

export const { setShowDisclaimerAgain } = persistentSlice.actions;

export default persistentSlice.reducer;
