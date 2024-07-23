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
  timeout: 15000,
  headers: { 'content-type': 'application/json' },
});

// Add a response interceptor
// api.interceptors.response.use(
//   response => response, // Pass through successful responses
//   error => {
//     // Check if the error is for the specific endpoint
//     if (
//       error.response &&
//       error.response.status === 404 &&
//       error.config.url.endsWith('/contacts')
//     ) {
//       // Create a custom error message for 404 errors on the /contacts endpoint
//       const customError = new Error(
//         "sssLooks like you haven't added any contacts yet."
//       );
//       customError.response = error.response;
//       return Promise.reject(customError);
//     }
//     // For other errors, reject the promise with the error
//     return Promise.reject(error);
//   }
// );

export default api;
