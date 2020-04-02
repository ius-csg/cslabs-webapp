import {TrackableEntity} from './Entity';

export interface User extends TrackableEntity {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  graduationYear?: number;
  userType: UserType;
  cardCodeHash?: string;
  terminationDate?: string;
}

export type UserType = 'Guest' | 'Creator' | 'Admin';

export interface UserWithToken extends User {
  token: string;
}
