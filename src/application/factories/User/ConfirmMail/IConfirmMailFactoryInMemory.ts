import { IConfirmMailUseCase } from '@application/useCases/User/ConfirmMail/IConfirmMailUseCase';
import { Cart } from '@domain/entities/Cart';
import { User } from '@domain/entities/User';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories/Cart/ICartRepositoryInMemoryImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories/User/IUserRepositoryInMemoryImpl';
import { IHashServiceBCryptImpl } from '@infra/services/IHashServiceBCryptImpl';

export class IConfirmMailFactoryInMemory {
  constructor(
    private readonly users: User[],
    private readonly carts: Cart[]
  ) {}
  compose(): IConfirmMailUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iCacheProvider = new ICacheProviderInMemoryImpl();
    const iUserRepository = new IUserRepositoryInMemoryImpl(this.users);
    const iCartRepository = new ICartRepositoryInMemoryImpl(this.carts)
    return new IConfirmMailUseCase(iUserRepository, iCartRepository, iCacheProvider);
  }
}
