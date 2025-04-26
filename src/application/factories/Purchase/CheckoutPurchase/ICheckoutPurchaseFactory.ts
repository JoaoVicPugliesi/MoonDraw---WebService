import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { ICheckoutPurchaseUseCase } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseUseCase';
import { ICacheProviderRedisImpl } from '@infra/providers/Cache/ICacheProviderRedisImpl';
import { IPaymentProviderStripeImpl } from '@infra/providers/Payment/IPaymentProviderStripeImpl';

export class ICheckoutPurchaseFactory {
  compose(): ICheckoutPurchaseUseCase {
    const iPaymentProviderStripeImpl = new IPaymentProviderStripeImpl();
    const iCacheProviderRedisImpl = new ICacheProviderRedisImpl();
    return new ICheckoutPurchaseUseCase(
      iPurchaseDecorator,
      iPaymentProviderStripeImpl,
      iCacheProviderRedisImpl
    );
  }
}
