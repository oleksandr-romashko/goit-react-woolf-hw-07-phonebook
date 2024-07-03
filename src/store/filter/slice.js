import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterAction: (_, action) => {
      return action.payload;
    },
  }
});

export const { setFilterAction } = filterSlice.actions;

export default filterSlice.reducer;