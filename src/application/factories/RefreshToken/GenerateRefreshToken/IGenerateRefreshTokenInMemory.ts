import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshTokenRepositoryInMemoryImpl } from '@infra/repositories/RefreshToken/IRefreshTokenRepositoryInMemoryImpl';

export class IGenerateRefreshTokenFactoryInMemory {

  constructor(
    private readonly refreshTokens: RefreshToken[]
  ) {}

  compose(): IGenerateRefreshTokenUseCase {
    const iRefreshTokenRepository = new IRefreshTokenRepositoryInMemoryImpl(this.refreshTokens);
    return new IGenerateRefreshTokenUseCase(
      iRefreshTokenRepository
    );;
  }
}
