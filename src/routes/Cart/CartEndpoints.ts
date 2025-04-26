import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iAttachProductIntoCart } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartComposer';
import { iDetachProductFromCart } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartComposer';
import { iListCartContent } from '@application/useCases/Сart/ListCartContent/IListCartContentComposer';
import { ICartValidator } from '@application/validators/Cart/ICartValidator';

export class CartEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iCartValidator: ICartValidator
  ) {}

  setupRoutes() {
    this.app.get('/api/carts/cart/products/:public_id', {
      schema: {
        tags: ['Carts']
      }
    },async (adapter: RequestResponseAdapter) => {
        await iListCartContent.handle(adapter);
    });
    this.app.post('/api/carts/cart/attach/product', {
      schema: {
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts']
      }
    },async (adapter: RequestResponseAdapter) => {
      await iAttachProductIntoCart.handle(adapter);
    });
    this.app.delete('/api/carts/cart/detach/product', {
      schema: {
        body: this.iCartValidator.validateAttachmentBetweenProductAndCart(),
        tags: ['Carts']
      }
    },async (adapter: RequestResponseAdapter) => {
        await iDetachProductFromCart.handle(adapter);
    })
  }
}
