import { IRefreshToken } from '@domain/entities/RefreshToken';

export interface IRefreshAccessTokenDTO extends Pick<IRefreshToken, 'public_id'> {};