import { Cart } from '@domain/entities/Cart';
import { IDetachProductFromCartUseCase } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartUseCase';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories/Cart/ICartRepositoryInMemoryImpl';
import { Cart_Product_Pivot } from '@prisma/client';

export class IDetachProductFromCartFactoryInMemory {
  constructor(
    private readonly carts: Cart[],
    private readonly pivot_carts_products: Cart_Product_Pivot[]
  ) {}
  compose(): IDetachProductFromCartUseCase {
    const iCartRepository = new ICartRepositoryInMemoryImpl(this.carts, this.pivot_carts_products);
    return new IDetachProductFromCartUseCase(iCartRepository);
  }
}
