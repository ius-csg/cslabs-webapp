import {WebState} from '../types/WebState';
import {User} from '../../types/User';
import jwt_decode from 'jwt-decode';
import {AuthToken} from '../../types/AuthToken';

export const getCurrentUser = (state: WebState) => state.entities.currentUser;

export function isAuthenticated(state: WebState) {
  const user: User | null = getCurrentUser(state);
  const token = localStorage.getItem('token');
  if (token && user) {
    // @ts-ignore
    const decoded = jwt_decode<AuthToken>(token);
    // @todo implement auth checking.
    return true;
  }
  return false;
}

export type mapIsAuthenticatedToPropsType = ReturnType<typeof mapIsAuthenticatedToProps>;
export const mapIsAuthenticatedToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});
