import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IGenerateRefreshTokenRepoImplInMemory } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoImplInMemory';

export class IGenerateRefreshTokenFactoryInMemory {

  constructor(private readonly refreshTokens: RefreshToken[]) {}

  compose(): IGenerateRefreshTokenUseCase {
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoImplInMemory(this.refreshTokens);
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );

    return iGenerateRefreshTokenUseCase;
  }
}
