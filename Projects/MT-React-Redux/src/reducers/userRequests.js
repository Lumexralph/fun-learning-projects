const userRequests = (state = [], action) => {
  switch (action.type) {
  case 'USER_REQUESTS':
    return [
      ...action.payload];
  default:
    return state;
  }
};

export default userRequests;
