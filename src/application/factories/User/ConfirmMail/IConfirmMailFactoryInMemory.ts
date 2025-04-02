import { IConfirmMailRepoImplInMemory } from '@infra/repositories_implementation/User/ConfirmMail/IConfirmMailRepoImplInMemory';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { User } from '@domain/entities/User';

export class IConfirmMailFactoryInMemory {
  constructor(private readonly users: User[]) {}

  compose(): IConfirmMailUseCase {
    const iConfirmMailRepo = new IConfirmMailRepoImplInMemory(this.users);
    const iConfirmMailUseCase = new IConfirmMailUseCase(iConfirmMailRepo);

    return iConfirmMailUseCase;
  }
}
