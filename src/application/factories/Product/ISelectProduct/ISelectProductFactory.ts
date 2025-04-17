import { ICacheServiceRedisImpl } from '@infra/services_implementation/CacheService/ICacheServiceRedisImpl';
import { ISelectProductUseCase } from "@application/useCases/Product/SelectProduct/ISelectProductUseCase";
import { ISelectProductRepoPrismaImpl } from "@infra/repositories_implementation/Product/SelectProduct/ISelectProductRepoPrismaImpl";

export class ISelectProductFactory {
    compose(): ISelectProductUseCase {
        const iSelectProductRepoPrismaImpl = new ISelectProductRepoPrismaImpl();
        const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();

        return new ISelectProductUseCase(iSelectProductRepoPrismaImpl, iCacheServiceRedisImpl);
    }
}