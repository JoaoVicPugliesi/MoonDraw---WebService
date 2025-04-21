import { iCartDecorator } from '@application/decorators/ICartDecorator';
import { IAttachProductIntoCartUseCase } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartUseCase';

export class IAttachProductIntoCartFactory {
  compose(): IAttachProductIntoCartUseCase {
    return new IAttachProductIntoCartUseCase(iCartDecorator);
  }
}
