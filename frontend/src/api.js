import axios from 'axios';

const api = axios.create({
  baseURL: 'https://collegemanagementsystem-1-009t.onrender.com/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('sb_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
