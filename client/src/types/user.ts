export interface IUser {
  nickname?: string;
  email?: string;
  isAdmin?: boolean;
}

export interface User {
  createdAt: string;
  email: string;
  nickname: string;
  oAuthProvider: string;
  oAuthProviderId: string;
  updatedAt: string;
}
