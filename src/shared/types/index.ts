export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  expiresAt: number;
  userInfo?: UserInfo;
}

export interface IContact {
  name: string;
  email: string;
  id: string;
}
