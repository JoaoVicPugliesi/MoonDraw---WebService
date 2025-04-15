import { IUser } from '@domain/entities/User';

export interface IRegisterDTO extends Pick<IUser, 'name' | 'surname' | 'email' | 'password'> {
    confirmPassword?: string
};
