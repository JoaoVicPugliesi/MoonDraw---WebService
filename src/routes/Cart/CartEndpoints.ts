import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iListCartContent } from '@application/useCases/Сart/ListCartContent/IListCartContentComposer';

export class CartEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.get('/api/carts/cart/products/:cart_id', async (adapter: RequestResponseAdapter) => {
        await iListCartContent.handle(adapter);
    })
  }
}
