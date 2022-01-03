import {WebState} from '../types/WebState';
import {User} from '../../types/User';
import jwt_decode from 'jwt-decode';
import {AuthToken} from '../../types/AuthToken';

export const getCurrentUser = (state: WebState) => state.entities.currentUser;

export function isAuthenticated(state: WebState) {
  const user: User | null = getCurrentUser(state);
  const token = localStorage.getItem('token');
  if (token && user) {
    const time = Math.ceil((new Date()).getTime() / 1000);
    const decoded = jwt_decode<AuthToken>(token);
    return time < decoded['exp'];
  }
  return false;
}

export type mapIsAuthenticatedToPropsType = ReturnType<typeof mapIsAuthenticatedToProps>;
export const mapIsAuthenticatedToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});

export function isCreator(state: WebState) {
  const user: User | null = getCurrentUser(state);
  if (user === null ) {
    return false;
  } else return user.role === 'Creator';
}

export function isAdmin(state: WebState) {
  const user: User| null =  getCurrentUser(state);
  if(user == null){return false;}
  else {
    return (user.role === 'Admin');
  }
}

export function isGuest(state: WebState) {
  const user: User | null =  getCurrentUser(state);
  return user?.role === 'Guest';
}