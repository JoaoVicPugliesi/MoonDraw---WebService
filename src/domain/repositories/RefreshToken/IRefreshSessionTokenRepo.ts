import { RefreshToken } from "@prisma/client";

export interface IRefreshSessionTokenRepo {
    findRefreshToken<T>(param: T): Promise<RefreshToken | null>;
    deleteRelatedRefreshToken<T>(param: T): Promise<void>;
}