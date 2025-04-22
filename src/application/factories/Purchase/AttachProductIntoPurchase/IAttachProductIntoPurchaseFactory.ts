import { iPurchaseDecorator } from "@application/decorators/IPurchaseDecorator";
import { IAttachProductIntoPurchaseUseCase } from "@application/useCases/Purchase/AttachProductIntoPurchase/IAttachProductIntoPurchaseUseCase";

export class IAttachProductIntoPurchaseFactory {
    compose(): IAttachProductIntoPurchaseUseCase {
        return new IAttachProductIntoPurchaseUseCase(iPurchaseDecorator);
    }
}