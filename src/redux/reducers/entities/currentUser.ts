import Action from '../../types/redux';
import {User} from '../../../types/User';
import {CurrentUserTypes} from '../../types/actionTypes';

export default function currentUser(state: User|null = null, action: Action) {
  switch (action.type) {
    case CurrentUserTypes.SET_USER: return action.data;
    default: return state;
  }
}
