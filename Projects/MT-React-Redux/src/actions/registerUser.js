import axiosInstance from '../helpers/apiCall';

const registerNewUser = user => () => {
  const JSONData = JSON.stringify(user);

  return axiosInstance.post('/auth/signup', JSONData);
};

export default registerNewUser;
