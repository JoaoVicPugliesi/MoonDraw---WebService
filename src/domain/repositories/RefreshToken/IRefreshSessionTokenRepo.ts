import { RefreshToken } from "@prisma/client";

export interface IRefreshSessionTokenRepo {
    findRefreshToken<T>(param: T): Promise<RefreshToken | null>;
    deleteRelatedRefreshTokens<T>(param: T): Promise<void>;
}