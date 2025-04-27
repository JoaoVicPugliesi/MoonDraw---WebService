import { iCartDecorator } from "@application/decorators/ICartDecorator";
import { IGetCartUseCase } from "@application/useCases/Сart/GetCart/IGetCartUseCase";

export class IGetCartFactory {
    compose(): IGetCartUseCase {
        return new IGetCartUseCase(iCartDecorator);
    }
}