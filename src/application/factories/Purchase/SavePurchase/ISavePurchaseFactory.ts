import { iPurchaseDecorator } from '@application/decorators/IPurchaseDecorator';
import { ISavePurchaseUseCase } from '@application/useCases/Purchase/SavePurchase/ISavePurchaseUseCase';

export class ISavePurchaseFactory {
    compose(): ISavePurchaseUseCase {
        return new ISavePurchaseUseCase(iPurchaseDecorator);
    }
}