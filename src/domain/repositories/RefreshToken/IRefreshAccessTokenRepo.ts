import { RefreshToken } from '@domain/entities/RefreshToken';
import { User } from '@domain/entities/User';


export interface IRefreshAccessTokenRepo {
    findRefreshToken<T>(param: T): Promise<RefreshToken | null>;
    findRefreshTokenUser<T>(param: T): Promise<User | null>;
    deleteRelatedRefreshTokens<T>(param: T): Promise<void>;
}