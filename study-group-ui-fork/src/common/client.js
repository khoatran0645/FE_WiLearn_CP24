import axios from 'axios';
import { BE_URL } from 'src/common/constants';

const client = axios.create({
  // baseURL: 'http://localhost:8001'
  baseURL: BE_URL
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

client.interceptors.response.use((response) => response.data);

export default client;
