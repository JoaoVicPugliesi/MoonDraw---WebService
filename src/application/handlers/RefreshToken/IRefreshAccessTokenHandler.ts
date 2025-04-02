import { RefreshToken } from '@domain/entities/RefreshToken';
export class InvalidRefreshTokenNotFoundResponse extends Error {};

export interface RefreshAccessTokenResponse {
    access_token: string,
    refresh_token?: RefreshToken
}