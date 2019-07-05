import axiosInstance, { setAuthorizationInHeader } from '../helpers/apiCall';
import getDataFromStorage from '../helpers/getDataFromStorage';

const getAllRequests = queryParams => () => {
  const url = queryParams ? `/requests?filter=${queryParams}` : '/requests';
  // retrieve token and set in header
  setAuthorizationInHeader(getDataFromStorage('token'));
  return axiosInstance.get(url);
};

export default getAllRequests;
