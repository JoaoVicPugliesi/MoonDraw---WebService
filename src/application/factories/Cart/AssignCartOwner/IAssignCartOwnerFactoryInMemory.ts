import { Cart } from '@domain/entities/Cart';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories/Cart/ICartRepositoryInMemoryImpl';
import { IUserRepositoryInMemoryImpl } from '@infra/repositories/User/IUserRepositoryInMemoryImpl';
import { User } from '@domain/entities/User';

export class IAssignCartOwnerFactoryInMemory {
  constructor(
    private readonly carts: Cart[],
    private readonly users: User[]
  ) {}
  compose(): IAssignCartOwnerUseCase {
    const iCartRepositoryInMemoryImpl = new ICartRepositoryInMemoryImpl(this.carts);
    const iUserRepositoryInMemoryImpl = new IUserRepositoryInMemoryImpl(this.users);
    return new IAssignCartOwnerUseCase(iCartRepositoryInMemoryImpl, iUserRepositoryInMemoryImpl);
  }
}
