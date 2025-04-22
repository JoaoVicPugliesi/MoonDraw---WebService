import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { IMeasurePurchaseUseCase } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseUseCase';
import { ICacheServiceRedisImpl } from '@infra/services_implementation/CacheService/ICacheServiceRedisImpl';

export class IMeasurePurchaseFactory {
    compose(): IMeasurePurchaseUseCase {
        const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();
        return new IMeasurePurchaseUseCase(iPurchaseDecorator, iCacheServiceRedisImpl);
    }
}