import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iAttachProductIntoCart } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartComposer';
import { iDetachProductFromCart } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartComposer';
import { iListCartContent } from '@application/useCases/Сart/ListCartContent/IListCartContentComposer';
import { ICartDocs } from './docs/ICartDocs';
import { iGetCart } from '@application/useCases/Сart/GetCart/IGetCartComposer';

export class CartEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iCartDocs: ICartDocs
  ) {}

  setupRoutes() {
    this.app.get(
      '/carts/cart/products/:public_id',
      {
        docs: this.iCartDocs.listCartContentDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iListCartContent.handle(adapter);
      }
    );
    this.app.post(
      '/carts/cart/attach/product',
      {
        docs: this.iCartDocs.attachProductIntoCartDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iAttachProductIntoCart.handle(adapter);
      }
    );
    this.app.delete(
      '/carts/cart/detach/product',
      {
        docs: this.iCartDocs.detachProductFromCartDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iDetachProductFromCart.handle(adapter);
      }
    );
    this.app.get(
      '/carts/cart/:user_id',
      {
        docs: {
          schema: {
            tags: ['carts']
          }
        }
      },
      async (adapter: RequestResponseAdapter) => {
        await iGetCart.handle(adapter);
      }
    );
  }
}
