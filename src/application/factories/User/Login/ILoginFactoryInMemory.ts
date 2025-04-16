import { User } from '@domain/entities/User';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { ILoginUseCase } from '@application/useCases/User/Login/ILoginUseCase';
import { ILoginRepoInMemoryImpl } from '@infra/repositories_implementation/User/Login/ILoginRepoInMemoryImpl';
import { IGenerateRefreshTokenFactoryInMemory } from '@application/factories/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenInMemory';
import { IHashServiceBCryptImpl } from '@infra/services_implementation/IHashServiceBcryptImpl';

export class ILoginFactoryInMemory {

  constructor(
    private readonly users: User[],
    private readonly refreshTokens: RefreshToken[]
  ) {}

  compose(): ILoginUseCase {
    const iLoginRepo = new ILoginRepoInMemoryImpl(this.users);
    const iHashService = new IHashServiceBCryptImpl();
    const iTokenService = new ITokenServiceJWTImpl();
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
