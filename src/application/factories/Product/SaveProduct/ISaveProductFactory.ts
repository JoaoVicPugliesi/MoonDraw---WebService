import { iProductDecorator } from '@application/decorators/IProductDecorator';
import { ISaveProductUseCase } from '@application/useCases/Product/SaveProduct/ISaveProductUseCase';

export class ISaveProductFactory {
  compose(): ISaveProductUseCase {
    return new ISaveProductUseCase(iProductDecorator);
  }
}
