import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { IListPurchasesUseCase } from '@application/useCases/Purchase/ListPurchases/IListPurchasesUseCase';
import { ICacheServiceRedisImpl } from '@infra/services_implementation/CacheService/ICacheServiceRedisImpl';

export class IListPurchasesFactory {
  compose(): IListPurchasesUseCase {
    const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();
    return new IListPurchasesUseCase(
      iPurchaseDecorator,
      iCacheServiceRedisImpl
    );
  }
}
