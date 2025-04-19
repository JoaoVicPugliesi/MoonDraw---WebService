import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { User } from '@domain/entities/User';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories_implementation/User/IUserRepositoryInMemoryImpl';
import { IHashServiceBCryptImpl } from '@infra/services_implementation/IHashServiceBCryptImpl';

export class IConfirmMailFactoryInMemory {
  constructor(
    private readonly users: User[]
  ) {}

  compose(): IConfirmMailUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iUserRepository = new IUserRepositoryInMemoryImpl(this.users, iHashService);

    return new IConfirmMailUseCase(iUserRepository);
  }
}
