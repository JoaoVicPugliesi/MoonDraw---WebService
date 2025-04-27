import { User } from '@domain/entities/User';
import { IRegisterUseCase } from '@application/useCases/User/Register/IRegisterUseCase';
import { IHashServiceBCryptImpl } from '@infra/services/IHashServiceBCryptImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories/User/IUserRepositoryInMemoryImpl';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';

export class IRegisterFactoryInMemory {
  constructor(
    private readonly users: User[],
    private readonly iMailProvider: { sendMail: any }
  ) {}

  compose(): IRegisterUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iCacheProvider = new ICacheProviderInMemoryImpl();
    const iUserRepository = new IUserRepositoryInMemoryImpl(
      this.users
    );
    return new IRegisterUseCase(
      iUserRepository,
      iCacheProvider,
      this.iMailProvider,
      iHashService
    );
  }
}
