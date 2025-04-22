import { iPurchaseDecorator } from "@application/decorators/IPurchaseDecorator";
import { IMeasurePurchaseUseCase } from "@application/useCases/Purchase/MeasurePurchase/IMeasurePurchaseUseCase";

export class IMeasurePurchaseFactory {
    compose(): IMeasurePurchaseUseCase {
        return new IMeasurePurchaseUseCase(iPurchaseDecorator);
    }
}