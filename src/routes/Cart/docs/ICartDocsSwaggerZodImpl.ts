import { DocSchema } from '@adapters/ServerAdapter';
import { ICartDocs } from './ICartDocs';
import { ICartValidator } from '@application/validators/Request/Cart/ICartValidator';
import { ICartValidatorZodImpl } from '@application/validators/Request/Cart/ICartValidatorZodImpl';

export class ICartDocsSwaggerZodImpl implements ICartDocs {
  constructor(
    private readonly iCartValidator: ICartValidator
  ) {}

  listCartContentDoc(): DocSchema {
    return {
      schema: {
        description: 'ListCartContentUseCase',
        tags: ['Carts'],
      },
    };
  }

  attachProductIntoCartDoc(): DocSchema {
    return {
      schema: {
        description: 'AttachProductIntoCartUseCase',
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts'],
      },
    };
  }

  detachProductFromCartDoc(): DocSchema {
    return {
      schema: {
        description: 'DetachProductFromCartUseCase',
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts'],
      },
    };
  }

  getCart(): DocSchema {
    return {
        schema: {
          tags: ['Carts']
        } 
    }
  }
}


const iCartValidator = new ICartValidatorZodImpl();
const iCartDocs = new ICartDocsSwaggerZodImpl(iCartValidator);

export { iCartDocs };