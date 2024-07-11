import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doNotShowDisclaimer: false,
};

const persistentSlice = createSlice({
  name: 'persistent',
  initialState,
  reducers: {
    setShowDisclaimer: (state, action) => {
      state.doNotShowDisclaimer = action.payload;
    }
  }
});

export const {
  setShowDisclaimer,
} = persistentSlice.actions;

export default persistentSlice.reducer;