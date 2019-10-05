
export interface User {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  schoolEmail: string;
  personalEmail: string;
  graduationYear?: number;
  userType: 'guest' | 'member' | 'officer' | 'staff';
  createdAt: string;
  updatedAt: string;
  cardCodeHash?: string;
  terminationDate?: string;
}

export interface UserWithToken extends User {
  token: string;
}
