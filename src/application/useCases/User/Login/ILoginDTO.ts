import { RefreshToken } from '@domain/entities/RefreshToken';
import { IUser, User } from '@domain/entities/User';

// Request
export interface ILoginDTO extends Pick<IUser, 'email' | 'password'> {}

// Response
export class UserNotFoundErrorResponse extends Error {}
export class PasswordIsNotEqualErrorResponse extends Error {}

export interface ILoginResponse {
    access_token: string,
    refresh_token: RefreshToken,
    user: Omit<User, 'id' | 'public_id' | 'password' | 'created_at' | 'email_verified_at' | 'last_login_at' | 'is_email_verified' | 'role'>
}