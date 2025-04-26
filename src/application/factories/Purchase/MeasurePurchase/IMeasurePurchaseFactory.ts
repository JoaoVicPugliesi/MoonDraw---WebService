import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { IMeasurePurchaseUseCase } from '@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers_implementation/Cache/ICacheProviderRedisImpl';

export class IMeasurePurchaseFactory {
    compose(): IMeasurePurchaseUseCase {
        const iCacheProviderRedisImpl = new ICacheProviderRedisImpl();
        return new IMeasurePurchaseUseCase(iPurchaseDecorator, iCacheProviderRedisImpl);
    }
}