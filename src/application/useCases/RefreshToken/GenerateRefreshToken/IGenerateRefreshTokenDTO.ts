import { IRefreshToken } from '@domain/entities/RefreshToken';

// Request
export interface IGenerateRefreshTokenDTO extends Pick<IRefreshToken, 'owner_id'> {};

// Response
export class GenerateRefreshTokenErrorResponse extends Error {};