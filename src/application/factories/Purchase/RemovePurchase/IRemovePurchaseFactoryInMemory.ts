import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepositoryInMemoryImpl } from '@infra/repositories/Purchase/IPurchaseRepositoryInMemoryImpl';
import { Purchase_Product_Pivot } from '@prisma/client';
import { IRemovePurchaseUseCase } from '@application/useCases/Purchase/RemovePurchase/IRemovePurchaseUseCase';

export class IRemovePurchaseFactoryInMemory {
  constructor(
    private readonly purchases: Purchase[],
    private readonly products: Product[],
    private readonly pivot_purchases_products: Purchase_Product_Pivot[],
  ) {}
  compose(): IRemovePurchaseUseCase {
    const iPurchaseRepository = new IPurchaseRepositoryInMemoryImpl(
      this.purchases,
      this.products,
      this.pivot_purchases_products
    );
    return new IRemovePurchaseUseCase(
        iPurchaseRepository
    );
  }
}
