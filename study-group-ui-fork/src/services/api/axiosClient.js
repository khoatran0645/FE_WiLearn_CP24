import axios from 'axios';
import { BE_URL } from 'src/common/constants';

const axiosClient = axios.create({
  // baseURL: 'http://localhost:8001',
  baseURL: BE_URL,
  timeout: 1000,
  headers: {
    'content-type': 'application/json'
  }
});
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
