import {getCurrentUser} from './entities';
import {useSelector} from 'react-redux';
import {User} from '../../types/User';

export function useUser(): User | null {
  return useSelector(getCurrentUser);
}
