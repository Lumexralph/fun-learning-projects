import { combineReducers } from 'redux';

import currentUser from './currentUser';
import userRequests from './userRequests';
import currentRequest from './currentRequest';

const maintenanceTrackerApp = combineReducers({
  currentUser,
  userRequests,
  currentRequest,
});

export default maintenanceTrackerApp;
