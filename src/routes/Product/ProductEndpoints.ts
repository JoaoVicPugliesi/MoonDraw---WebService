import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iSelectProduct } from '@application/useCases/Product/SelectProduct/ISelectProductComposer';
import { iSelectProducts } from '@application/useCases/Product/SelectProducts/ISelectProductsComposer';

export class ProductEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.get('/api/products/:page(\\d+)', async (adapter: RequestResponseAdapter) => {
      await iSelectProducts.handle(adapter)
      console.log('called');
    });
    this.app.get('/api/products/product/:id', async (adapter: RequestResponseAdapter) => {
      console.log('called');
      await iSelectProduct.handle(adapter)
    });
  }
}
