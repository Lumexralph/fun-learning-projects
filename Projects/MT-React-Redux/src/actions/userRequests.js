import { USER_REQUESTS } from '../constants';

const userRequests = requests => ({
  type: USER_REQUESTS,
  payload: requests,
});

export default userRequests;
