import { RefreshToken } from "@domain/entities/RefreshToken";

export interface IRefreshAccessTokenRepo {
    findRefreshToken<T>(param: T): Promise<RefreshToken | null>;
    deleteRelatedRefreshTokens<T>(param: T): Promise<void>;
}