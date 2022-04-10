import {TrackableEntity} from './Entity';

export interface User extends TrackableEntity {
  verified: boolean;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  graduationYear?: number;
  role: Role;
  cardCodeHash?: string;
  terminationDate?: string;
  subscribedNewsletter: boolean;
}

export const ERole = {
  'Guest': 'Guest',
  'Creator': 'Creator',
  'Admin': 'Admin'
} as const;
export type Role = keyof typeof ERole;

export interface UserWithToken extends User {
  token: string;
}
