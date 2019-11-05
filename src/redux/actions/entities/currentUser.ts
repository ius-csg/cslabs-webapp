import Action from '../../types/redux';
import {CurrentUserTypes} from '../../types/actionTypes';
import {User} from '../../../types/User';

export const setCurrentUser = (user: User|null): Action => ({
  type: CurrentUserTypes.SET_USER,
  data: user
});
