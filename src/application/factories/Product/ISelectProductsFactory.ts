import { iSelectProductDecorator } from "@application/decorators/Product/ISelectProductsDecorator";
import { ISelectProductsUseCase } from "@application/useCases/Product/SelectProducts/ISelectProductsUseCase";
import { ICacheServiceRedisImpl } from "@infra/services_implementation/ICacheServiceRedisImpl";

export class ISelectProductsFactory {
    compose(): ISelectProductsUseCase {
        const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();
        return new ISelectProductsUseCase(iSelectProductDecorator, iCacheServiceRedisImpl);
    }
}