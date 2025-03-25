import { IUser } from "../../../../domain/entities/User";

export interface ICreateUserDTO extends Pick<IUser, 'name' | 'surname' | 'email' | 'password'> {};
