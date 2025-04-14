import { IGenerateRefreshTokenRepoPrismaImpl } from '@infra/repositories_implementation/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenRepoPrismaImpl';
import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { IRefreshAccessTokenUseCase } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenUseCase';
import { iRefreshAccessTokenDecorator } from '@application/decorators/RefreshToken/IRefreshAccessTokenDecorator';

export class IRefreshAccessTokenFactory {
  compose(): IRefreshAccessTokenUseCase {
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenRepo = new IGenerateRefreshTokenRepoPrismaImpl();
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iGenerateRefreshTokenRepo
    );
    const iRefreshAccessTokenUseCase = new IRefreshAccessTokenUseCase(
      iRefreshAccessTokenDecorator,
      iGenerateRefreshTokenUseCase,
      iTokenService
    );

    return iRefreshAccessTokenUseCase;
  }
}
