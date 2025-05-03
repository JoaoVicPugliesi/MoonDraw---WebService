import { ICacheProviderRedisImpl } from '@infra/providers/Cache/ICacheProviderRedisImpl';
import { ISearchProductsUseCase } from '@application/useCases/Product/SearchProducts/ISearchProductsUseCase';
import { iProductDecorator } from '@application/decorators/IProductDecorator';

export class ISearchProductsFactory {
  compose(): ISearchProductsUseCase {
    const iCacheProviderRedisImpl = new ICacheProviderRedisImpl();

    return new ISearchProductsUseCase(
      iProductDecorator,
      iCacheProviderRedisImpl
    );
  }
}
