import { ILoginFactoryInMemory } from '@application/factories/User/Login/ILoginFactoryInMemory';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { User } from '@domain/entities/User';
import { IBcryptHashServiceImpl } from '@infra/services_implementation/IBcryptHashServiceImpl';
import { IRegisterRepoImplInMemory } from '@infra/repositories_implementation/User/Register/IRegisterRepoImplInMemory';
import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';

export class IRegisterFactoryInMemory {
  constructor(
    private readonly users: User[],
    private readonly refreshTokens: RefreshToken[],
    private readonly iMailProvider: { sendMail: any }
  ) {}

  compose(): IRegisterUseCase {
    const iHashService = new IBcryptHashServiceImpl();
    const iLoginFactoryInMemory = new ILoginFactoryInMemory(this.users, this.refreshTokens)
    const iLoginUseCase = iLoginFactoryInMemory.compose();
    const iRegisterRepo = new IRegisterRepoImplInMemory(
      this.users,
      iHashService
    );
    const iRegisterUseCase = new IRegisterUseCase(
      iRegisterRepo,
      this.iMailProvider,
      iLoginUseCase
    );

    return iRegisterUseCase;
  }
}
