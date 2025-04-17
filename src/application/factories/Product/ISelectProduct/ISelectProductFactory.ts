import { iSelectProductDecorator } from '@application/decorators/Product/ISelectProductDecorator';
import { ISelectProductUseCase } from '@application/useCases/Product/SelectProduct/ISelectProductUseCase';
import { ICacheServiceRedisImpl } from '@infra/services_implementation/CacheService/ICacheServiceRedisImpl';

export class ISelectProductFactory {
  compose(): ISelectProductUseCase {
    const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();

    return new ISelectProductUseCase(
      iSelectProductDecorator,
      iCacheServiceRedisImpl
    );
  }
}
