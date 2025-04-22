import { IInitiatePurchaseUseCase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseUseCase';
import { ISavePurchaseFactory } from '../SavePurchase/ISavePurchaseFactory';
import { IAttachProductIntoPurchaseFactory } from '../AttachProductIntoPurchase/IAttachProductIntoPurchaseFactory';
import { IMeasurePurchaseFactory } from '../MeasurePurchase/IMeasurePurchaseFactory';

export class IInitiatePurchaseFactory {
  compose(): IInitiatePurchaseUseCase {
    const iMeasurePurchaseFactory = new IMeasurePurchaseFactory();
    const iSavePurchaseFactory = new ISavePurchaseFactory();
    const iAttachProductIntoPurchaseFactory = new IAttachProductIntoPurchaseFactory();
    const iMeasurePurchaseUseCase = iMeasurePurchaseFactory.compose();
    const iSavePurchaseUseCase = iSavePurchaseFactory.compose();
    const iAttachProductIntoPurchaseUseCase = iAttachProductIntoPurchaseFactory.compose();

    return new IInitiatePurchaseUseCase(
      iMeasurePurchaseUseCase,
      iSavePurchaseUseCase,
      iAttachProductIntoPurchaseUseCase
    );
  }
}
