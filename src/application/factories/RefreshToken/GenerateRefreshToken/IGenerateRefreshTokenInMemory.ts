import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IGenerateRefreshTokenRepoInMemoryImpl } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoInMemoryImpl';

export class IGenerateRefreshTokenFactoryInMemory {

  constructor(
    private readonly refreshTokens: RefreshToken[]
  ) {}

  compose(): IGenerateRefreshTokenUseCase {
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoInMemoryImpl(this.refreshTokens);
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );

    return iGenerateRefreshTokenUseCase;
  }
}
