import { DocSchema } from '@adapters/ServerAdapter';
import { ICartDocs } from './ICartDocs';
import { ICartValidator } from '@application/validators/Request/Cart/ICartValidator';
import { ICartValidatorZodImpl } from '@application/validators/Request/Cart/ICartValidatorZodImpl';
import { ICartResponseValidator } from '@application/validators/Response/Cart/ICartResponseValidator';
import { ICartResponseValidatorZodImpl } from '@application/validators/Response/Cart/ICartResponseValidatorZodImpl';

export class ICartDocsSwaggerZodImpl implements ICartDocs {
  constructor(
    private readonly iCartValidator: ICartValidator,
    private readonly iCartResponseValidator: ICartResponseValidator
  ) {}

  getCart(): DocSchema {
    return {
      schema: {
        description: 'Here you may have access a cart based on the user_id provided',
        tags: ['Carts'],
        response: this.iCartResponseValidator.validateGetCart(),
      },
    };
  }
  listCartContentDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may list products related to the specified cart by providing the respective public_id',
        tags: ['Carts'],
        response: this.iCartResponseValidator.validateListCartContent(),
      },
    };
  }

  attachProductIntoCartDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may attach a product into a cart by providing the cart_id and product_id respectively',
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts'],
        response: this.iCartResponseValidator.validateAttachProductIntoCart()
      },
    };
  }

  detachProductFromCartDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may detach a product from a cart by providing the cart_id and product_id respectively',
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts'],
        response: this.iCartResponseValidator.validateDetachProductFromCart()
      },
    };
  }
}

const iCartValidator = new ICartValidatorZodImpl();
const iCartResponseValidator = new ICartResponseValidatorZodImpl();
const iCartDocs = new ICartDocsSwaggerZodImpl(iCartValidator, iCartResponseValidator);

export { iCartDocs };
