import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { IListPurchasesUseCase } from '@application/useCases/Purchase/ListPurchases/IListPurchasesUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers_implementation/Cache/ICacheProviderRedisImpl';

export class IListPurchasesFactory {
  compose(): IListPurchasesUseCase {
    const iCacheProviderRedisImpl = new ICacheProviderRedisImpl();
    return new IListPurchasesUseCase(
      iPurchaseDecorator,
      iCacheProviderRedisImpl
    );
  }
}
