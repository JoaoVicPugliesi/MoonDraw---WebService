import { IRefreshToken, RefreshToken } from '@domain/entities/RefreshToken';
import { User } from '@domain/entities/User';

// Request
export interface IRefreshAccessTokenDTO extends Pick<IRefreshToken, 'public_id'> {};

// Response 
export class RefreshTokenNotFoundErrorResponse extends Error {};
export class RefreshTokenUserNotFoundErrorResponse extends Error{};

export interface RefreshAccessTokenResponse {
    access_token: string,
    refresh_token?: RefreshToken,
    user: Omit<User, 'id' | 'public_id' | 'password' | 'created_at' | 'email_verified_at' | 'last_login_at' | 'role' | 'is_email_verified'>
}