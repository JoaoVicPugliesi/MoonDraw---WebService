import { IAttachProductIntoCartUseCase } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartUseCase';
import { Cart } from '@domain/entities/Cart';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories/Cart/ICartRepositoryInMemoryImpl';
import { Cart_Product_Pivot } from '@prisma/client';

export class IAttachProductIntoCartFactoryInMemory {
  constructor(
    private readonly carts: Cart[],
    private readonly pivot_carts_products: Cart_Product_Pivot[]
  ) {}
  compose(): IAttachProductIntoCartUseCase {
    const iCartRepository = new ICartRepositoryInMemoryImpl(this.carts, this.pivot_carts_products);
    return new IAttachProductIntoCartUseCase(iCartRepository);
  }
}
