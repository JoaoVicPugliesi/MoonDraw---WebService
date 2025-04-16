import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { selectProducts } from '@application/useCases/Product/SelectProducts/ISelectProductsComposer';

export class ProductEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.get('/api/products/:page', async (adapter: RequestResponseAdapter) => {
        await selectProducts.handle(adapter)
      });

  }
}
