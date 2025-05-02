import { User } from '@domain/entities/User';
import { IGenerateRefreshTokenFactoryInMemory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenInMemory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IRefreshAccessTokenUseCase } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshTokenRepositoryInMemoryImpl } from '@infra/repositories/RefreshToken/IRefreshTokenRepositoryInMemoryImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories/User/IUserRepositoryInMemoryImpl';

export class IRefreshAccessTokenFactoryInMemory {

  constructor(
    private readonly users: User[],
    private readonly refreshTokens: RefreshToken[]
  ) {}

  compose(): IRefreshAccessTokenUseCase {
    const iRefreshTokenRepository = new IRefreshTokenRepositoryInMemoryImpl(this.refreshTokens);
    const iUserRepository = new IUserRepositoryInMemoryImpl(this.users);
    const iTokenService = new ITokenServiceJWTImpl();
    const iGenerateRefreshTokenFactoryInMemory = new IGenerateRefreshTokenFactoryInMemory(this.refreshTokens);
    const iGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactoryInMemory.compose()

    return new IRefreshAccessTokenUseCase(
      iRefreshTokenRepository,
      iUserRepository,
      iGenerateRefreshTokenUseCase,
      iTokenService
    );;
  }
}