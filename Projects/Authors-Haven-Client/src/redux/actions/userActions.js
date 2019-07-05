import api, { setAuthorizationHeader, setTokenToStorage, removeTokenFromStorage } from '../api';
import actionTypes from './actionTypes';

export const setCurrentUser = payload => ({
  type: actionTypes.SET_CURRENT_USER,
  payload,
});

const login = details => dispatch => api.post('/api/users/login', details).then((res) => {
  const detail = {
    username: res.data.user.username,
    email: res.data.user.email,
    image: res.data.user.image,
  };
  setAuthorizationHeader(res.data.user.token);
  setTokenToStorage('authorsHaven-token', res.data.user.token);
  dispatch(setCurrentUser(detail));
});

export const logout = () => (dispatch) => {
  setAuthorizationHeader();
  removeTokenFromStorage('authorsHaven-token');
  return dispatch({ type: 'UNSET_CURRENT_USER' });
};

export default login;
