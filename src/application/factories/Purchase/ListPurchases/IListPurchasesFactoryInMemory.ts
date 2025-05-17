import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepositoryInMemoryImpl } from '@infra/repositories/Purchase/IPurchaseRepositoryInMemoryImpl';
import { Purchase_Product_Pivot } from '@prisma/client';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { IListPurchasesUseCase } from '@application/useCases/Purchase/ListPurchases/IListPurchasesUseCase';

export class IListPurchasesFactoryInMemory {
  constructor(
    private readonly purchases: Purchase[],
    private readonly products: Product[],
    private readonly pivot_purchases_products: Purchase_Product_Pivot[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): IListPurchasesUseCase {
    const iPurchaseRepository = new IPurchaseRepositoryInMemoryImpl(
      this.purchases,
      this.products,
      this.pivot_purchases_products
    );
    const iCacheProvider = new ICacheProviderInMemoryImpl(this.cache);
    return new IListPurchasesUseCase(
      iPurchaseRepository,
      iCacheProvider
    );
  }
}
