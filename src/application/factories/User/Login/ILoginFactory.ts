
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { IGenerateRefreshTokenFactory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenFactory';
import { IHashServiceBCryptImpl } from '@infra/services/IHashServiceBCryptImpl';
import { iUserDecorator } from '@application/decorators/IUserDecorator';

export class ILoginFactory {
  compose(): ILoginUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iTokenService = new ITokenServiceJWTImpl();
    const iGenerateRefreshTokenFactory = new IGenerateRefreshTokenFactory();
    const iGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactory.compose(); 
    
    return new ILoginUseCase(
      iUserDecorator,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );
  }
}
