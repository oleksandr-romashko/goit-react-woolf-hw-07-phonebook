import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doNotShowDisclaimer: false,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setDoNotShowDisclaimerAgainAction: (state, action) => {
      state.doNotShowDisclaimer = action.payload;
    },
  },
});

export const { setDoNotShowDisclaimerAgainAction } = applicationSlice.actions;

export default applicationSlice.reducer;
