import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { RefreshToken } from '@domain/entities/RefreshToken';

export interface IGenerateRefreshTokenRepo {
    findRelatedRefreshTokens<T>(param: T): Promise<RefreshToken | RefreshToken[] | null>;
    deleteRelatedRefreshTokens<T>(param: T): Promise<void>;
    saveRefreshToken(DTO: IGenerateRefreshTokenDTO): Promise<RefreshToken | null>;
}