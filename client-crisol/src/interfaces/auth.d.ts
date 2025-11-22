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

export interface IUser {
  username: string;
  email: string;
}