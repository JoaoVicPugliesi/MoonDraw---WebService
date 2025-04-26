import { DocSchema } from '@adapters/ServerAdapter';
import { ICartDocs } from './ICartDocs';
import { ICartValidator } from '@application/validators/Cart/ICartValidator';
import { ICartValidatorZodImpl } from '@application/validators/Cart/ICartValidatorZodImpl';

export class ICartDocsSwaggerZodImpl implements ICartDocs {
  constructor(
    private readonly iCartValidator: ICartValidator
  ) {}

  listCartContentDocs(): DocSchema {
    return {
      schema: {
        description: 'ListCartContentUseCase',
        tags: ['Carts'],
      },
    };
  }

  attachProductIntoCartDocs(): DocSchema {
    return {
      schema: {
        description: 'AttachProductIntoCartUseCase',
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts'],
      },
    };
  }

  detachProductFromCartDocs(): DocSchema {
    return {
      schema: {
        description: 'DetachProductFromCartUseCase',
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts'],
      },
    };
  }
}


const iCartValidator = new ICartValidatorZodImpl();
const iCartDocs = new ICartDocsSwaggerZodImpl(iCartValidator);

export { iCartDocs };