import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { ICheckoutPurchaseUseCase } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseUseCase';
import { ICacheServiceRedisImpl } from '@infra/services_implementation/CacheService/ICacheServiceRedisImpl';
import { IPaymentServiceStripeImpl } from '@infra/services_implementation/IPaymentServiceStripeImpl';

export class ICheckoutPurchaseFactory {
  compose(): ICheckoutPurchaseUseCase {
    const iPaymentServiceStripeImpl = new IPaymentServiceStripeImpl();
    const iCacheServiceRedisImpl = new ICacheServiceRedisImpl();
    return new ICheckoutPurchaseUseCase(
      iPurchaseDecorator,
      iPaymentServiceStripeImpl,
      iCacheServiceRedisImpl
    );
  }
}
