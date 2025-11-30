export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  valid: string;
  userId: string;
  token: string;
}

export interface IUserResponse {
  valid: string;
  user: IUser
}

export interface IUsersResponse {
  valid: string;
  results: string;
  users: IUser[];
}

export interface IForgot {
  email: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  accountVerified: boolean;
  createdAt: string;
}

export interface IResetPassword {
  userId: string;
  password: string;  
  token: string;
}

export interface IUserItemProps {
  users: IUser;
  index: number;
}

export interface IVerify {
  userId: String;
  otp: String;
}