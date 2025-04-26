import { Cart } from '@domain/entities/Cart';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories_implementation/Cart/ICartRepositoryInMemoryImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories_implementation/User/IUserRepositoryInMemoryImpl';
import { User } from '@domain/entities/User';
import { IHashServiceBCryptImpl } from '@infra/services/IHashServiceBCryptImpl';

export class IAssignCartOwnerFactoryInMemory {
  constructor(
    private readonly carts: Cart[],
    private readonly users: User[]
  ) {}
  compose(): IAssignCartOwnerUseCase {
    const iHashService = new IHashServiceBCryptImpl();
    const iCartRepositoryInMemoryImpl = new ICartRepositoryInMemoryImpl(this.carts);
    const iUserRepositoryInMemoryImpl = new IUserRepositoryInMemoryImpl(this.users, iHashService);
    return new IAssignCartOwnerUseCase(iCartRepositoryInMemoryImpl, iUserRepositoryInMemoryImpl);
  }
}
