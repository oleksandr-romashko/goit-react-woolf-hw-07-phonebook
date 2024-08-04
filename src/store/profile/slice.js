import { createSlice } from '@reduxjs/toolkit';

export const PROFILE_REQUEST_STATUS = Object.freeze({
  updateUserData: {
    pending: 'updateUserData/pending',
    successful: 'updateUserData/successful',
    failed: 'updateUserData/failed',
  },
  deleteCurrentUser: {
    pending: 'deleteCurrentUser/inProgress',
    successful: 'deleteCurrentUser/successful',
    failed: 'deleteCurrentUser/failed',
  },
});

const initialState = {
  loading: false,
  error: null,
  status: null,
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
    setProfileStatusAction: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  setProfileLoadingAction,
  setProfileErrorAction,
  setProfileStatusAction,
} = profileSlice.actions;

export default profileSlice.reducer;
