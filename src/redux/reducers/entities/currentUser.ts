import Action from '../../types/redux';
import {User} from '../../../types/User';
import {CurrentUserTypes} from '../../types/actionTypes';

// Code smell on this function signature
export default function currentUser(state: User|null = null, action: Action) {
  if (action.type === CurrentUserTypes.SET_USER) {
    return action.data;
  } else {
    return state;
  }
}
