import { CURRENT_REQUEST } from '../constants';

const createdRequest = requests => ({
  type: CURRENT_REQUEST,
  payload: requests,
});

export default createdRequest;
