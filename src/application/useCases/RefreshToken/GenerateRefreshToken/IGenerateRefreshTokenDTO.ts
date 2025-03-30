import { IRefreshToken } from "@domain/entities/RefreshToken";

export interface IGenerateRefreshTokenDTO extends Pick<IRefreshToken, 'user_id'> {};