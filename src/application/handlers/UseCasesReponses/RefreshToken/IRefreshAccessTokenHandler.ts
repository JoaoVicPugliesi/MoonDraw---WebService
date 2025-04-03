import { RefreshToken } from '@domain/entities/RefreshToken';
export class InvalidRefreshTokenNotFoundErrorResponse extends Error {};
export class InvalidRefreshTokenUserNotFoundErrorResponse extends Error{};

export interface RefreshAccessTokenResponse {
    access_token: string,
    refresh_token?: RefreshToken
}