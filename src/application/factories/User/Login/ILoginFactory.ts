
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { IGenerateRefreshTokenFactory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenFactory';
import { iLoginDecorator } from '@application/decorators/User/ILoginDecorator';
import { IHashServiceBCryptImpl } from '@infra/services_implementation/IHashServiceBcryptImpl';

export class ILoginFactory {
  compose(): ILoginUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iTokenService = new ITokenServiceJWTImpl();
    const iGenerateRefreshTokenFactory = new IGenerateRefreshTokenFactory();
    const iGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactory.compose();
    const iLoginUseCase = new ILoginUseCase(
      iLoginDecorator,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );
    
    return iLoginUseCase;
  }
}
