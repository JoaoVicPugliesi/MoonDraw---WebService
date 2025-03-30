import { IRefreshToken } from "@domain/entities/RefreshToken";

export interface IRefreshSessionTokenDTO extends Pick<IRefreshToken, 'public_id'> {};