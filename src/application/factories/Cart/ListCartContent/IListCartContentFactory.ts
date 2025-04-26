import { iCartDecorator } from '@application/decorators/ICartDecorator';
import { IListCartContentUseCase } from '@application/useCases/Сart/ListCartContent/IListCartContentUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers/Cache/ICacheProviderRedisImpl';

export class IListCartContentFactory {
    compose(): IListCartContentUseCase {
        const iCacheProvider = new ICacheProviderRedisImpl();

        return new IListCartContentUseCase(iCartDecorator, iCacheProvider);
    }
}