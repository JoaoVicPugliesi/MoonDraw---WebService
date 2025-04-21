import { iCartDecorator } from '@application/decorators/ICartDecorator';
import { IDetachProductFromCartUseCase } from './../../../useCases/Сart/DetachProductFromCart/IDetachProductFromCartUseCase';
export class IDetachProductFromCartFactory {
  compose(): IDetachProductFromCartUseCase {
    return new IDetachProductFromCartUseCase(iCartDecorator);
  }
}
