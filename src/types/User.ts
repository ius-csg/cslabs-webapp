import {TrackableEntity} from './Entity';

export interface User extends TrackableEntity {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  graduationYear?: number;
  userType: 'guest' | 'creator' | 'admin';
  cardCodeHash?: string;
  terminationDate?: string;
}

export interface UserWithToken extends User {
  token: string;
}
