import { IInitiatePurchaseUseCase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseUseCase';
import { ISavePurchaseFactory } from '../SavePurchase/ISavePurchaseFactory';
import { IAttachProductIntoPurchaseFactory } from '../AttachProductIntoPurchase/IAttachProductIntoPurchaseFactory';
import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';

export class IInitiatePurchaseFactory {
  compose(): IInitiatePurchaseUseCase {
    const iSavePurchaseFactory = new ISavePurchaseFactory();
    const iAttachProductIntoPurchaseFactory = new IAttachProductIntoPurchaseFactory();
    const iSavePurchaseUseCase = iSavePurchaseFactory.compose();
    const iAttachProductIntoPurchaseUseCase = iAttachProductIntoPurchaseFactory.compose();

    return new IInitiatePurchaseUseCase(
      iPurchaseDecorator,
      iSavePurchaseUseCase,
      iAttachProductIntoPurchaseUseCase
    );
  }
}
