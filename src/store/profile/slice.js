import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileLoadingAction: (state, action) => {
      state.loading = action.payload;
    },
    setProfileErrorAction: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProfileLoadingAction, setProfileErrorAction } =
  profileSlice.actions;

export default profileSlice.reducer;
