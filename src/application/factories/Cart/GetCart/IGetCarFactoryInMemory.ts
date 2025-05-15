import { Cart } from '@domain/entities/Cart';
import { IGetCartUseCase } from '@application/useCases/Сart/GetCart/IGetCartUseCase';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories/Cart/ICartRepositoryInMemoryImpl';

export class IGetCartFactoryInMemory {
  constructor(
    private readonly carts: Cart[]
  ) {}
  compose(): IGetCartUseCase {
    const iCarRepository = new ICartRepositoryInMemoryImpl(this.carts);
    return new IGetCartUseCase(iCarRepository);
  }
}
