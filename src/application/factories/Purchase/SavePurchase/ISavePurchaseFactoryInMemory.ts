import { ISavePurchaseUseCase } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseUseCase';
import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepositoryInMemoryImpl } from '@infra/repositories/Purchase/IPurchaseRepositoryInMemoryImpl';
import { Purchase_Product_Pivot } from '@prisma/client';

export class ISavePurchaseFactoryInMemory {
  constructor(
    private readonly purchases: Purchase[],
    private readonly products: Product[],
    private readonly pivot_purchases_products: Purchase_Product_Pivot[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): ISavePurchaseUseCase {
    const iPurchaseRepository = new IPurchaseRepositoryInMemoryImpl(
      this.purchases,
      this.products,
      this.pivot_purchases_products
    );
    return new ISavePurchaseUseCase(iPurchaseRepository);
  }
}
