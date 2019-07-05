import axiosInstance, { setAuthorizationInHeader } from '../helpers/apiCall';
import getDataFromStorage from '../helpers/getDataFromStorage';

const createUserRequest = request => () => {
  // retrieve token and set in header
  setAuthorizationInHeader(getDataFromStorage('token'));

  const requestDetails = JSON.stringify(request);

  return axiosInstance.post('/users/requests', requestDetails);
};

export default createUserRequest;
