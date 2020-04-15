import {TrackableEntity} from './Entity';

export interface User extends TrackableEntity {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  graduationYear?: number;
  role: Role;
  cardCodeHash?: string;
  terminationDate?: string;
}

export type Role = 'Guest' | 'Creator' | 'Admin';

export interface UserWithToken extends User {
  token: string;
}
