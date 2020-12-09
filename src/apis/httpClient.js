import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const instance = axios.create({
  baseURL: publicRuntimeConfig?.NODE_ENV === 'production' ? `${publicRuntimeConfig?.BACKEND_URL}` : `${process.env.BACKEND_URL}`,
  headers: {
    //rejectUnauthorized: false,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Do something with response data
  return response.data;
}, (error) => {
  // Do something with response error
  console.error(error);
  throw error;
});


export default instance;