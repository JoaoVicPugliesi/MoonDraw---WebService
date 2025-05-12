import { IRefreshToken } from '@domain/entities/RefreshToken';

// Request
export interface ILogoutDTO extends Pick<IRefreshToken, 'public_id'> {}

// Response
export class RefreshTokenNotFoundErrorResponse extends Error {}
export interface Success {
    success: boolean
}
export type ILogoutResponse = 
| RefreshTokenNotFoundErrorResponse
| Success