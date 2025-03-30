import { IGenerateRefreshTokenDTO } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { RefreshToken } from "@domain/entities/RefreshToken";

export interface IGenerateRefreshTokenRepo {
    saveRefreshToken(DTO: IGenerateRefreshTokenDTO): Promise<RefreshToken | null>;
}