import { iSearchProductsDecorator } from '@application/decorators/Product/ISearchProductsDecorator';
import { ICacheServiceRedisImpl } from './../../../../infra/services_implementation/CacheService/ICacheServiceRedisImpl';
import { ISearchProductsUseCase } from '@application/useCases/Product/SearchProducts/ISearchProductsUseCase';

export class ISearchProductsFactory {
  compose(): ISearchProductsUseCase {
    const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();

    return new ISearchProductsUseCase(
      iSearchProductsDecorator,
      iCacheServiceRedisImpl
    );
  }
}
