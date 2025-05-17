import { Product } from '@domain/entities/Product';
import { Purchase } from '@domain/entities/Purchase';
import { IPurchaseRepositoryInMemoryImpl } from '@infra/repositories/Purchase/IPurchaseRepositoryInMemoryImpl';
import { Purchase_Product_Pivot } from '@prisma/client';
import { ICacheProviderInMemoryImpl } from '@infra/providers/Cache/ICacheProviderInMemoryImpl';
import { ICheckoutPurchaseUseCase } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseUseCase';

export class ICheckoutPurchaseFactoryInMemory {
  constructor(
    private readonly purchases: Purchase[],
    private readonly products: Product[],
    private readonly pivot_purchases_products: Purchase_Product_Pivot[],
    private readonly cache: Map<string, string>
  ) {}
  compose(): ICheckoutPurchaseUseCase {
    const iPurchaseRepository = new IPurchaseRepositoryInMemoryImpl(
      this.purchases,
      this.products,
      this.pivot_purchases_products
    );
    const iCacheProvider = new ICacheProviderInMemoryImpl(this.cache);
    const iPaymentProvider = {
      create: jest.fn().mockReturnValue({
        url: {}
      }),
      retrieve: jest.fn().mockReturnValue({
        session: {
          customer_details: {},
          payment_intent: {}
        }
      }),
      listLineItems: jest.fn(),
    };
    return new ICheckoutPurchaseUseCase(
      iPurchaseRepository,
      iPaymentProvider,
      iCacheProvider
    );
  }
}
