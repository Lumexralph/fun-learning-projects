import axios from 'axios';

const baseURL = 'https://maintenance-tracker-lumexralph.herokuapp.com/api/v1';
const instance = axios.create({
  baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const setAuthorizationInHeader = (token = null) => {
  const defaultHeader = instance.defaults.headers.common;

  if (token) {
    defaultHeader.Authorization = token;
  } else {
    delete defaultHeader.Authorization;
  }
  return defaultHeader;
};

export default instance;
