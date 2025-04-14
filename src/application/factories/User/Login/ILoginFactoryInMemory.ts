import { User } from '@domain/entities/User';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IBcryptHashServiceImpl } from '@infra/services_implementation/IBcryptHashServiceImpl';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { ILoginRepoInMemoryImpl } from '@infra/repositories_implementation/User/Login/ILoginRepoInMemoryImpl';
import { IGenerateRefreshTokenFactoryInMemory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenInMemory';

export class ILoginFactoryInMemory {

  constructor(
    private readonly users: User[],
    private readonly refreshTokens: RefreshToken[]
  ) {}

  compose(): ILoginUseCase {
    const iLoginRepo = new ILoginRepoInMemoryImpl(this.users);
    const iHashService = new IBcryptHashServiceImpl();
    const iTokenService = new IJWTTokenServiceImpl();
    const iGenerateRefreshTokenFactoryInMemory = new IGenerateRefreshTokenFactoryInMemory(this.refreshTokens);
    const iGenerateRefreshTokenUseCase = iGenerateRefreshTokenFactoryInMemory.compose();
    const iLoginUseCase = new ILoginUseCase(
      iLoginRepo,
      iHashService,
      iTokenService,
      iGenerateRefreshTokenUseCase
    );

    return iLoginUseCase;
  }
}
