import { User } from '@domain/entities/User';
import { IAssignCartOwnerFactory } from '@application/factories/Cart/AssignCartOwner/IAssignCartOwnerFactory';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories/User/IUserRepositoryInMemoryImpl';

export class IConfirmMailFactoryInMemory {
  constructor(
    private readonly users: User[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): IConfirmMailUseCase {
    const iCacheProvider = new ICacheProviderInMemoryImpl(this.cache);
    const iUserRepository = new IUserRepositoryInMemoryImpl(this.users);
    const iAssignCartOwnerFactory = new IAssignCartOwnerFactory()
    const iAssignCartOwnerUseCase = iAssignCartOwnerFactory.compose()
    return new IConfirmMailUseCase(iUserRepository, iAssignCartOwnerUseCase, iCacheProvider);
  }
}
