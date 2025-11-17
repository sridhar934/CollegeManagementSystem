import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7020/api', // 👈 use your backend API URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('sb_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
