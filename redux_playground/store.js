// import { createStore, combineReducers } from 'redux';


// our action
const updateCounter = count => ({
  type: 'UPDATE',
  count
});

const updateNamer = name => ({
  type: 'NAME_CHANGER',
  payload: name
});




// our reducer
const updateCount = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.count + 1;
    default:
      return state;
  }
}

const updateName = ( state = [], action) => {
  switch (action.type) {
    case 'NAME_CHANGER':
      return action.payload;
    default:
      return state;
  }
}

const ourApp = Redux.combineReducers({
  updateCount,
  updateName
});

const ourStore = Redux.createStore(ourApp);
ourStore.subscribe(() => console.log('Hi, the store has just been updated'));

console.log(ourStore.getState());

ourStore.dispatch(updateCounter(4));
