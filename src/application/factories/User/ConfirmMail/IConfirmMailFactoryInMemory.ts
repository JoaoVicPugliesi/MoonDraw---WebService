import { IConfirmMailRepoInMemoryImpl } from '@infra/repositories_implementation/User/ConfirmMail/IConfirmMailRepoInMemoryImpl';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { User } from '@domain/entities/User';

export class IConfirmMailFactoryInMemory {
  constructor(
    private readonly users: User[]
  ) {}

  compose(): IConfirmMailUseCase {
    const iConfirmMailRepo = new IConfirmMailRepoInMemoryImpl(this.users);

    return new IConfirmMailUseCase(iConfirmMailRepo);
  }
}
