import { iProductDecorator } from '@application/decorators/IProductDecorator';
import { ISelectProductUseCase } from '@application/useCases/Product/SelectProduct/ISelectProductUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers_implementation/Cache/ICacheProviderRedisImpl';

export class ISelectProductFactory {
  compose(): ISelectProductUseCase {
    const iCacheProviderRedisImpl = new ICacheProviderRedisImpl();

    return new ISelectProductUseCase(
      iProductDecorator,
      iCacheProviderRedisImpl
    );
  }
}
