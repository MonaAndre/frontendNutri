import { IUser } from "./IUser";

export interface IResponse{
    message: string,
    user: IUser,
    error:string,
}