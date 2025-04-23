import { iPurchaseDecorator } from "@application/decorators/IPurchaseDecorator";
import { IRemovePurchaseUseCase } from "@application/useCases/Purchase/RemovePurchase/IRemovePurchaseUseCase";

export class IRemovePurchaseFactory {
    compose(): IRemovePurchaseUseCase {
        return new IRemovePurchaseUseCase(iPurchaseDecorator);
    }
}