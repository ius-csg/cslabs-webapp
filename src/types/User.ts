
export interface User {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  graduationYear?: number;
  userType: 'guest' | 'member' | 'officer' | 'staff' | 'creator';
  createdAt: string;
  updatedAt: string;
  cardCodeHash?: string;
  terminationDate?: string;
}

export interface UserWithToken extends User {
  token: string;
}
