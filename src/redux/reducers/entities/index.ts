import {combineReducers} from 'redux';
import currentUser from './currentUser';

const entities = combineReducers({
  currentUser: currentUser
});

export default entities;
