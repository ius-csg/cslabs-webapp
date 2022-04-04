import Action from '../../types/redux';
import {User} from '../../../types/User';
import {CurrentUserTypes} from '../../types/actionTypes';

// Code smell on this function signature
export default function currentUser(state: User|null = null, action: Action): User|null {
  if (action.type === CurrentUserTypes.SET_USER) {
    return action.data;
  }
  if (action.type === CurrentUserTypes.SET_VERIFIED) {
      if(!state)
        return state;
      return {
        ...state as User,
        verified: action.data as boolean
      };
  }
  else {
    return state;
  }
}

