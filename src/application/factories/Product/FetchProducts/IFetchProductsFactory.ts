import { iProductDecorator } from '@application/decorators/IProductDecorator';
import { IFetchProductsUseCase } from '@application/useCases/Product/FetchProducts/IFetchProductsUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers_implementation/Cache/ICacheProviderRedisImpl';

export class IFetchProductsFactory {
    compose(): IFetchProductsUseCase {
        const iCacheProviderRedisImpl = new ICacheProviderRedisImpl();
        return new IFetchProductsUseCase(iProductDecorator, iCacheProviderRedisImpl);
    }
}