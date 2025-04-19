import axios from 'axios';

const instance = axios.create({ baseURL: 'https://task-4-8wd4.onrender.com/api/auth' });

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;