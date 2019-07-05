const currentRequest = (state = {}, action) => {
  switch (action.type) {
  case 'CURRENT_REQUEST':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default currentRequest;
