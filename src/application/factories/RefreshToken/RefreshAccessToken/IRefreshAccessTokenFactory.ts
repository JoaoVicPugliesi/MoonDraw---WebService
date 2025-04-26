import { IGenerateRefreshTokenUseCase } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenUseCase';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IRefreshAccessTokenUseCase } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenUseCase';
import { iRefreshTokenDecorator } from '@application/decorators/IRefreshTokenDecorator';
import { iUserDecorator } from '@application/decorators/IUserDecorator';

export class IRefreshAccessTokenFactory {
  compose(): IRefreshAccessTokenUseCase {
    const iTokenService = new ITokenServiceJWTImpl();
    const iGenerateRefreshTokenUseCase = new IGenerateRefreshTokenUseCase(
      iRefreshTokenDecorator
    );
    
    return new IRefreshAccessTokenUseCase(
      iRefreshTokenDecorator,
      iUserDecorator,
      iGenerateRefreshTokenUseCase,
      iTokenService
    );;
  }
}
