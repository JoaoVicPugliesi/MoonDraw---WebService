import { IUser } from '@domain/entities/User';

// Request
export interface IRegisterDTO extends Pick<IUser, 'name' | 'surname' | 'email' | 'password'> {
    confirmPassword?: string
};

// Response
export class UserConflictErrorResponse extends Error {};
export class UserProcessingConflictErrorResponse extends Error{};

export interface IRegisterResponse {
    temporary_access_token: string
}
   