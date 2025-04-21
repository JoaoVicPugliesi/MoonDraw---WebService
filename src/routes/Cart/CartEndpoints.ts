import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iAttachProductIntoCart } from '@application/useCases/Сart/AttachProductIntoCart/IAttachProductIntoCartComposer';
import { iListCartContent } from '@application/useCases/Сart/ListCartContent/IListCartContentComposer';

export class CartEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.get('/api/carts/cart/products/:cart_id', async (adapter: RequestResponseAdapter) => {
        await iListCartContent.handle(adapter);
    });
    this.app.post('/api/carts/cart/attach/product', async (adapter: RequestResponseAdapter) => {
        await iAttachProductIntoCart.handle(adapter);
    });
  }
}
