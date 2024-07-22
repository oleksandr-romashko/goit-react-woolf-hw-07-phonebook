import axios from 'axios';

/**
 * API secret key retrieved from environment variable.
 */
const API_KEY = process.env.REACT_APP_MOCKAPI_API_SECRET;

/**
 * Axios instance with common settings.
 */
export const api = axios.create({
  baseURL: `https://${API_KEY}.mockapi.io`,
  timeout: 9000,
  headers: { 'content-type': 'application/json' },
});

export default api;
