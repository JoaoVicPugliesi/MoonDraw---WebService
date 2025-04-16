import { IRefreshToken } from '@domain/entities/RefreshToken';

export interface ILogoutDTO extends Pick<IRefreshToken, 'public_id'> {}