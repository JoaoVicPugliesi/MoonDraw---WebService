import { Cart } from '@domain/entities/Cart';
import { IAssignCartOwnerUseCase } from '@application/useCases/Сart/AssignCartOwner/IAssignCartOwnerUseCase';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories_implementation/Cart/ICartRepositoryInMemoryImpl';

export class IAssignCartOwnerFactoryInMemory {
  constructor(
    private readonly carts: Cart[]
  ) {}
  compose(): IAssignCartOwnerUseCase {
    const iCartRepositoryInMemoryImpl = new ICartRepositoryInMemoryImpl(this.carts);
    return new IAssignCartOwnerUseCase(iCartRepositoryInMemoryImpl);
  }
}
