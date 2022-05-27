export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  cart: any;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  authEmail: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserListOne {
  id: string;
}
export interface IUserUpdate {
  name: string;
  email: string;
  password: string;
  id: any;
  isAdm: boolean;
}
