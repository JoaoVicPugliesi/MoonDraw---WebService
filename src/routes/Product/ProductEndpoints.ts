import { RequestResponseAdapter, ServerAdapter } from "@adapters/ServerAdapter";
import { fetchProducts } from "@application/useCases/Product/FetchProducts/IFetchProductsComposer";

export class ProductEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.get('/api/products/:page', async (adapter: RequestResponseAdapter) => {
        await fetchProducts.handle(adapter)
      });

  }
}
