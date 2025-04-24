import { iDeliveryDecorator } from "@application/decorators/IDeliveryDecorator";
import { ISaveDeliveryUseCase } from "@application/useCases/Delivery/SaveDelivery/ISaveDeliveryUseCase";

export class ISaveDeliveryFactory {
  compose(): ISaveDeliveryUseCase {
    return new ISaveDeliveryUseCase(iDeliveryDecorator);
  }
}
