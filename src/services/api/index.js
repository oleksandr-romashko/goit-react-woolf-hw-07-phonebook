import axios from 'axios';

const API_KEY = process.env.REACT_APP_MOCKAPI_API_SECRET;

export const api = axios.create({
  baseURL: `https://${API_KEY}.mockapi.io`,
  params: {
    headers: {'content-type':'application/json'},
  },
});

export default api;