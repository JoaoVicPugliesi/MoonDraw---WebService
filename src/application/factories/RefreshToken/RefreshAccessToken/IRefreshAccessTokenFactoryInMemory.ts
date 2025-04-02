import { IGenerateRefreshTokenFactoryInMemory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenInMemory';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { IRefreshAccessTokenUseCase } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenUseCase';
import { IRefreshAccessTokenRepoImplInMemory } from '@infra/repositories_implementation/RefreshToken/RefreshAccessToken/IRefreshAccessTokenRepoImplInMemory';
import { RefreshToken } from '@domain/entities/RefreshToken';

export class IRefreshAccessTokenFactoryInMemory {

  constructor(private readonly refreshTokens: RefreshToken[]) {}

  compose(): IRefreshAccessTokenUseCase {
    const iRefreshAccessTokenRepo = new IRefreshAccessTokenRepoImplInMemory(this.refreshTokens);
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenFactoryInMemory = new IGenerateRefreshTokenFactoryInMemory(this.refreshTokens);
    const iGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactoryInMemory.compose()
    const iRefreshAccessTokenUseCase = new IRefreshAccessTokenUseCase(
      iRefreshAccessTokenRepo,
      iGenerateRefreshTokenUseCase,
      iTokenService
    );

    return iRefreshAccessTokenUseCase;
  }
}