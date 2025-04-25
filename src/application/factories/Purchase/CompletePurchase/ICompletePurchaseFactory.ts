import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { ISaveDeliveryFactory } from '@application/factories/Delivery/SaveDelivery/ISaveDeliveryFactory';
import { ICompletePurchaseUseCase } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseUseCase';
import { IPaymentServiceStripeImpl } from '@infra/services_implementation/IPaymentServiceStripeImpl';

export class ICompletePurchaseFactory {
  compose(): ICompletePurchaseUseCase {
    const iPaymentServiceStripeImpl = new IPaymentServiceStripeImpl();
    const iSaveDeliveryFactory = new ISaveDeliveryFactory();
    const iSaveDeliveryUseCase = iSaveDeliveryFactory.compose();
    return new ICompletePurchaseUseCase(
      iPurchaseDecorator,
      iPaymentServiceStripeImpl,
      iSaveDeliveryUseCase
    );
  }
}
