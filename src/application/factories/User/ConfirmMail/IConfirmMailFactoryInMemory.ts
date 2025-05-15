import { User } from '@domain/entities/User';
import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories/User/IUserRepositoryInMemoryImpl';
import { IAssignCartOwnerFactoryInMemory } from '@application/factories/Cart/AssignCartOwner/IAssignCartOwnerFactoryInMemory';
import { Cart } from '@domain/entities/Cart';

export class IConfirmMailFactoryInMemory {
  constructor(
    private readonly users: User[],
    private readonly carts: Cart[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): IConfirmMailUseCase {
    const iCacheProvider = new ICacheProviderInMemoryImpl(this.cache);
    const iUserRepository = new IUserRepositoryInMemoryImpl(this.users);
    const iAssignCartOwnerFactory = new IAssignCartOwnerFactoryInMemory(this.carts, this.users)
    const iAssignCartOwnerUseCase = iAssignCartOwnerFactory.compose()
    return new IConfirmMailUseCase(iUserRepository, iAssignCartOwnerUseCase, iCacheProvider);
  }
}
