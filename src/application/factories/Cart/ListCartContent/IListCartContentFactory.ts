import { iCartDecorator } from "@application/decorators/ICartDecorator";
import { IListCartContentUseCase } from "@application/useCases/Сart/ListCartContent/IListCartContentUseCase";
import { ICacheServiceRedisImpl } from "@infra/services_implementation/CacheService/ICacheServiceRedisImpl";

export class IListCartContentFactory {
    compose(): IListCartContentUseCase {
        const iCacheService = new ICacheServiceRedisImpl();

        return new IListCartContentUseCase(iCartDecorator, iCacheService);
    }
}