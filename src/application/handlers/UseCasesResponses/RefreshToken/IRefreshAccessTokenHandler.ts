import { RefreshToken } from '@domain/entities/RefreshToken';
import { User } from '@domain/entities/User';
export class InvalidRefreshTokenNotFoundErrorResponse extends Error {};
export class InvalidRefreshTokenUserNotFoundErrorResponse extends Error{};

export interface RefreshAccessTokenResponse {
    access_token: string,
    refresh_token?: RefreshToken,
    user: Omit<User, 'id' | 'public_id' | 'password' | 'created_at' | 'email_verified_at' | 'last_login_at'>
}