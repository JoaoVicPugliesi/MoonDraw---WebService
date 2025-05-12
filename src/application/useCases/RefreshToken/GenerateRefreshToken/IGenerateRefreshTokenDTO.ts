import { IRefreshToken, RefreshToken } from "@domain/entities/RefreshToken"

// Request
export interface IGenerateRefreshTokenDTO extends Pick<IRefreshToken, 'owner_id'> {};

// Response
export class GenerateRefreshTokenErrorResponse extends Error {};
export interface Success {
    refreshToken: RefreshToken
}
export type IGenerateRefreshTokenResponse =
| GenerateRefreshTokenErrorResponse
| Success