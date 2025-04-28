import { IRefreshToken } from '@domain/entities/RefreshToken';

// Request
export interface ILogoutDTO extends Pick<IRefreshToken, 'public_id'> {}

// Response
export class RefreshTokenNotFoundErrorResponse extends Error {}