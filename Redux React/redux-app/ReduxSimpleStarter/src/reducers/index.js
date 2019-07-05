import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';

// mapping of state happens here
const rootReducer = combineReducers({
  books: BooksReducer
});

export default rootReducer;
