import { ILoginFactoryInMemory } from '@application/factories/User/Login/ILoginFactoryInMemory';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { User } from '@domain/entities/User';
import { IRegisterRepoInMemoryImpl } from '@infra/repositories_implementation/User/Register/IRegisterRepoInMemoryImpl';
import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { IHashServiceBCryptImpl } from '@infra/services_implementation/IHashServiceBCryptImpl';

export class IRegisterFactoryInMemory {
  constructor(
    private readonly users: User[],
    private readonly refreshTokens: RefreshToken[],
    private readonly iMailProvider: { sendMail: any }
  ) {}

  compose(): IRegisterUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iLoginFactoryInMemory = new ILoginFactoryInMemory(this.users, this.refreshTokens)
    const iLoginUseCase = iLoginFactoryInMemory.compose();
    const iRegisterRepo = new IRegisterRepoInMemoryImpl(
      this.users,
      iHashService
    );

    return new IRegisterUseCase(
      iRegisterRepo,
      this.iMailProvider,
      iLoginUseCase
    );
  }
}
