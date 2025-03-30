import { RefreshToken } from "@prisma/client";

export interface IRefreshTokenRepo {
    findRefreshToken<T>(param: T): Promise<RefreshToken | null>;
}