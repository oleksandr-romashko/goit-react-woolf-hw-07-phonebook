import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_MOCKAPI_API_SECRET;

axios.defaults.baseURL = `https://${API_KEY}.mockapi.io`;
axios.defaults.params = {
  headers: {'content-type':'application/json'},
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
