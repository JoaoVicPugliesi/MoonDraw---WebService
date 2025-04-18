import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iSearchProducts } from '@application/useCases/Product/SearchProducts/ISearchProductsComposer';
import { iSelectProduct } from '@application/useCases/Product/SelectProduct/ISelectProductComposer';
import { iSelectProducts } from '@application/useCases/Product/SelectProducts/ISelectProductsComposer';

export class ProductEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.get('/api/products/:page(\\d+)', async (adapter: RequestResponseAdapter) => {
      await iSelectProducts.handle(adapter)
    });
    this.app.get('/api/products/product/:id', async (adapter: RequestResponseAdapter) => {
      await iSelectProduct.handle(adapter)
    });

    this.app.get('/api/products/search/:name', async (adapter: RequestResponseAdapter) => {
      await iSearchProducts.handle(adapter)
    });
  }
}
