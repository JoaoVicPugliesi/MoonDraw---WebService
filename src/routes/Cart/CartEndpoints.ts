import { ServerAdapter } from '@adapters/ServerAdapter';
import { iAttachProductIntoCart } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartComposer';
import { iDetachProductFromCart } from '@application/useCases/Сart/DetachProductFromCart/IDetachProductFromCartComposer';
import { iListCartContent } from '@application/useCases/Сart/ListCartContent/IListCartContentComposer';
import { ICartDocs } from './docs/ICartDocs';
import { iGetCart } from '@application/useCases/Сart/GetCart/IGetCartComposer';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class CartEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iCartDocs: ICartDocs
  ) {}

  setupRoutes() {
    this.app.get(
      '/carts/cart/products/:public_id',
      async (adapter: RequestResponseAdapter
      ) => {
        await iListCartContent.handle(adapter);
      },
      {
        docs: this.iCartDocs.listCartContentDoc(),
      },
    );
    this.app.post(
      '/carts/cart/attach/product',
      async (adapter: RequestResponseAdapter) => {
        await iAttachProductIntoCart.handle(adapter);
      },
      {
        docs: this.iCartDocs.attachProductIntoCartDoc(),
      },
    );
    this.app.delete(
      '/carts/cart/detach/product',
      async (adapter: RequestResponseAdapter) => {
        await iDetachProductFromCart.handle(adapter);
      },
      {
        docs: this.iCartDocs.detachProductFromCartDoc(),
      },
    );
    this.app.get(
      '/carts/cart/:user_id',
      async (adapter: RequestResponseAdapter) => {
        await iGetCart.handle(adapter);
      },
      {
        docs: this.iCartDocs.getCart()
      },
    );
  }
}
