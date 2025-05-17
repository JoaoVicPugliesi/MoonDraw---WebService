import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepositoryInMemoryImpl } from '@infra/repositories/Purchase/IPurchaseRepositoryInMemoryImpl';
import { Purchase_Product_Pivot } from '@prisma/client';
import { ICompletePurchaseUseCase } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseUseCase';
import { ISaveDeliveryFactoryInMemory } from '@application/factories/Delivery/SaveDelivery/ISaveDeliveryFactoryInMemory';
import { Delivery } from '@domain/entities/Delivery';

export class ICompletePurchaseFactoryInMemory {
  constructor(
    private readonly purchases: Purchase[],
    private readonly products: Product[],
    private readonly pivot_purchases_products: Purchase_Product_Pivot[],
    private readonly deliveries: Delivery[],
  ) {}
  compose(): ICompletePurchaseUseCase {
    const iPurchaseRepository = new IPurchaseRepositoryInMemoryImpl(
      this.purchases,
      this.products,
      this.pivot_purchases_products
    );
    const iPaymentProvider = {
      create: jest.fn(),
      retrieve: jest.fn().mockReturnValue({
        session: {
          customer_details: {},
          payment_intent: {}
        }
      }),
      listLineItems: jest.fn(),
    };
    const iSaveDeliveryFactory = new ISaveDeliveryFactoryInMemory(this.deliveries)
    const iSaveDeliveryUseCase = iSaveDeliveryFactory.compose();
    return new ICompletePurchaseUseCase(
      iPurchaseRepository,
      iPaymentProvider,
      iSaveDeliveryUseCase
    );
  }
}
