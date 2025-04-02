import { ILoginRepoImpl } from '@infra/repositories_implementation/User/Login/ILoginRepoImpl';
import { IBcryptHashServiceImpl } from '@infra/services_implementation/IBcryptHashServiceImpl';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { IGenerateRefreshTokenFactory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenFactory';

export class ILoginFactory {
  compose(): ILoginUseCase {
    const iLoginRepo = new ILoginRepoImpl();
    const iHashService = new IBcryptHashServiceImpl();
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenFactory = new IGenerateRefreshTokenFactory();
    const iGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactory.compose();
    const iLoginUseCase = new ILoginUseCase(
      iLoginRepo,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );
    
    return iLoginUseCase;
  }
}
