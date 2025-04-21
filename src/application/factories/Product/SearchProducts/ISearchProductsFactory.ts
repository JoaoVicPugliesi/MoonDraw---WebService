import { ICacheServiceRedisImpl } from '../../../../infra/services_implementation/CacheService/ICacheServiceRedisImpl';
import { ISearchProductsUseCase } from '@application/useCases/Product/SearchProducts/ISearchProductsUseCase';
import { iProductDecorator } from '@application/decorators/IProductDecorator';

export class ISearchProductsFactory {
  compose(): ISearchProductsUseCase {
    const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();

    return new ISearchProductsUseCase(
      iProductDecorator,
      iCacheServiceRedisImpl
    );
  }
}
