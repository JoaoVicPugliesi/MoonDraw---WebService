import { IGenerateRefreshTokenDTO } from "@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO";
import { RefreshToken } from "@domain/entities/RefreshToken";

export interface IRefreshTokenRepository {
  findRelatedRefreshTokens<T>(param: T): Promise<RefreshToken | RefreshToken[] | null>;
  findRefreshToken<T>(param: T): Promise<RefreshToken | null>;
  deleteRelatedRefreshTokens<T>(param: T): Promise<void>;
  saveRefreshToken(DTO: IGenerateRefreshTokenDTO): Promise<RefreshToken | null>;
}
