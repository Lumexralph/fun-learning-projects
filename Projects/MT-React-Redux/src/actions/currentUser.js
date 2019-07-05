import { NEW_USER } from '../constants';

const signupUser = user => ({
  type: NEW_USER,
  payload: user,
});

export default signupUser;
