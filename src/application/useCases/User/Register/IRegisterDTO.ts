import { IUser } from '@domain/entities/User';

// Request
export interface IRegisterDTO
  extends Pick<
    IUser,
    | 'icon_id'
    | 'name'
    | 'surname'
    | 'email'
    | 'role'
    | 'description'
    | 'password'
  > {
  confirmPassword?: string;
}

// Response
export class UserConflictErrorResponse extends Error {}
export class UserProcessingConflictErrorResponse extends Error {}
export interface Success {
  temporary_access_token: string;
}

export type IRegisterResponse = 
| UserConflictErrorResponse
| UserProcessingConflictErrorResponse
| Success
