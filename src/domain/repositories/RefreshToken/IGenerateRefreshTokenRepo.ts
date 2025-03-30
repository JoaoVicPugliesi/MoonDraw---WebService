import { RefreshToken } from "@domain/entities/RefreshToken";

export interface IGenerateRefreshTokenRepo {
    saveRefreshToken<T>(param: T): Promise<RefreshToken | null>;
}