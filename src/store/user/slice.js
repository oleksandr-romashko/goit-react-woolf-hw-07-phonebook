import { createSlice } from '@reduxjs/toolkit';
import { createUser, switchUser, updateUserKey } from './operations';

export const userRequestStatus = Object.freeze({});

const initialState = {
  id: null,
  uuid: null,
  key: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserKeyAction(state, action) {
      state.key = action.payload;
    },
    rehydrateUserStateAction: (state, action) => {
      state.id = action.payload.id;
      state.uuid = action.payload.uuid;
      state.key = action.payload.key;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.uuid = action.payload.uuid;
        state.key = action.payload.key;
      })
      .addCase(switchUser.fulfilled, (state, action) => {
        const { id, uuid, key } = action.payload;
        state.id = id;
        state.uuid = uuid;
        state.key = key;
      })
      .addCase(updateUserKey.fulfilled, (state, action) => {
        state.key = action.payload;
      });
  },
});

export const { setUserKeyAction, rehydrateUserStateAction } = userSlice.actions;

export default userSlice.reducer;
