import { IUser } from "@domain/entities/User";

export interface ILoginDTO extends Pick<IUser, 'email' | 'password'> {};