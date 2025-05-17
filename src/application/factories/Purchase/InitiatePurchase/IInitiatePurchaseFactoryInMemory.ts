import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { Purchase_Product_Pivot } from '@prisma/client';
import { IInitiatePurchaseUseCase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseUseCase';
import { IMeasurePurchaseFactoryInMemory } from '../MeasurePurchase/IMeasurePurchaseFactoryInMemory';
import { ISavePurchaseFactoryInMemory } from '../SavePurchase/ISavePurchaseFactoryInMemory';
import { IAttachProductIntoPurchaseFactoryInMemory } from '../AttachProductIntoPurchase/IAttachProductIntoPurchaseFactoryInMemory';

export class IInitiatePurchaseFactoryInMemory {
  constructor(
    private readonly purchases: Purchase[],
    private readonly products: Product[],
    private readonly pivot_purchases_products: Purchase_Product_Pivot[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): IInitiatePurchaseUseCase {
    const iMeasurePurchaseFactory = new IMeasurePurchaseFactoryInMemory(
      this.purchases,
      this.products,
      this.pivot_purchases_products,
      this.cache
    )
    const iMeasurePurchaseUseCase = iMeasurePurchaseFactory.compose();
    const iSavePurchaseFactory = new ISavePurchaseFactoryInMemory(
      this.purchases,
      this.products,
      this.pivot_purchases_products,
      this.cache
    )
    const iSavePurchaseUseCase = iSavePurchaseFactory.compose();
    const iAttachProductIntoPurchaseFactory = new IAttachProductIntoPurchaseFactoryInMemory(
      this.purchases,
      this.products,
      this.pivot_purchases_products,
    )
    const iAttachProductIntoPurchaseUseCase = iAttachProductIntoPurchaseFactory.compose();

    return new IInitiatePurchaseUseCase(
      iMeasurePurchaseUseCase,
      iSavePurchaseUseCase,
      iAttachProductIntoPurchaseUseCase
    );
  }
}
