import { iProductDecorator } from '@application/decorators/IProductDecorator';
import { IFetchProductsUseCase } from '@application/useCases/Product/FetchProducts/IFetchProductsUseCase';
import { ICacheServiceRedisImpl } from '@infra/services_implementation/CacheService/ICacheServiceRedisImpl';

export class IFetchProductsFactory {
    compose(): IFetchProductsUseCase {
        const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();
        return new IFetchProductsUseCase(iProductDecorator, iCacheServiceRedisImpl);
    }
}