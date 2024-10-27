import { IUser } from "./IUser";

export interface IAuthResponse {
    isAuthenticated: boolean;
    user?: IUser;
  }