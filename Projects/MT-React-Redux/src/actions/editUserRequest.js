import axiosInstance, { setAuthorizationInHeader } from '../helpers/apiCall';
import getDataFromStorage from '../helpers/getDataFromStorage';

const editUserRequest = (id, updatedRequest) => () => {
  // retrieve token and set in header
  setAuthorizationInHeader(getDataFromStorage('token'));

  const requestDetails = JSON.stringify(updatedRequest);

  return axiosInstance.put(`users/requests/${id}`, requestDetails);
};

export default editUserRequest;
