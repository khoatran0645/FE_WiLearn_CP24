import { axios } from "axios";

const axiosClient = axios.create({
  baseURL: "http://www.groupstudy.somee.com",
  // baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use((response) => response.data);

export default axiosClient;