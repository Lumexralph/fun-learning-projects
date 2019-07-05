import axiosInstance, { setAuthorizationInHeader } from '../helpers/apiCall';
import getDataFromStorage from '../helpers/getDataFromStorage';

const adminActionOnRequest = (id, action) => () => {
  // retrieve token and set in header
  setAuthorizationInHeader(getDataFromStorage('token'));

  return axiosInstance.put(`/requests/${id}/${action}`);
};

export default adminActionOnRequest;
