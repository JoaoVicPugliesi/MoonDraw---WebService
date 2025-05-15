import { Cart } from '@domain/entities/Cart';
import { IListCartContentUseCase } from '@application/useCases/Сart/ListCartContent/IListCartContentUseCase';
import { ICartRepositoryInMemoryImpl } from '@infra/repositories/Cart/ICartRepositoryInMemoryImpl';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { Product } from '@domain/entities/Product';
import { Cart_Product_Pivot } from '@prisma/client';

export class IListCarContentFactoryInMemory {
  constructor(
    private readonly carts: Cart[],
    private readonly pivot_carts_products: Cart_Product_Pivot[],
    private readonly products: Product[]
  ) {}
  compose(): IListCartContentUseCase {
    const iCacheProvider = new ICacheProviderInMemoryImpl();
    const iCartRepository = new ICartRepositoryInMemoryImpl(
      this.carts,
      this.pivot_carts_products,
      this.products
    );
    return new IListCartContentUseCase(iCartRepository, iCacheProvider);
  }
}
