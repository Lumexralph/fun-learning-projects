import clearStorageData from '../../helpers/clearStorageData';

const logOut = (history) => {
  clearStorageData();

  history.push('/');

  return null;
};

export default logOut;
