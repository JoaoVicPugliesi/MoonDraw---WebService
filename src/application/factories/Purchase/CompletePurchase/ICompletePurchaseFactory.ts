import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { ISaveDeliveryFactory } from '@application/factories/Delivery/SaveDelivery/ISaveDeliveryFactory';
import { ICompletePurchaseUseCase } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseUseCase';
import { IPaymentProviderStripeImpl } from '@infra/providers/Payment/IPaymentProviderStripeImpl';

export class ICompletePurchaseFactory {
  compose(): ICompletePurchaseUseCase {
    const iPaymentProviderStripeImpl = new IPaymentProviderStripeImpl();
    const iSaveDeliveryFactory = new ISaveDeliveryFactory();
    const iSaveDeliveryUseCase = iSaveDeliveryFactory.compose();
    return new ICompletePurchaseUseCase(
      iPurchaseDecorator,
      iPaymentProviderStripeImpl,
      iSaveDeliveryUseCase
    );
  }
}
