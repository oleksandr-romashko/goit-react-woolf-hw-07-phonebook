import { createSlice } from '@reduxjs/toolkit';
import { createUser } from './operations';

const initialState = {
  id: null,
  uuid: null,
  key: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    rehydrateUserStateAction: (state, action) => {
      state.id = action.payload.id;
      state.uuid = action.payload.uuid;
      state.key = action.payload.key;
    },
  },
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.uuid = action.payload.uuid;
      state.key = action.payload.key;
    });
  },
});

export const { rehydrateUserStateAction } = userSlice.actions;

export default userSlice.reducer;
