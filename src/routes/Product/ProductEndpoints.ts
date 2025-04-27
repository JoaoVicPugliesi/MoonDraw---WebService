import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iSearchProducts } from '@application/useCases/Product/SearchProducts/ISearchProductsComposer';
import { iSelectProduct } from '@application/useCases/Product/SelectProduct/ISelectProductComposer';
import { iFetchProducts } from '@application/useCases/Product/FetchProducts/IFetchProductsComposer';
import { iSaveProduct } from '@application/useCases/Product/SaveProduct/ISaveProductComposer';
import { IProductDocs } from './docs/IProductDocs';

export class ProductEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iProductDocs: IProductDocs
  ) {}

  setupRoutes() {
    this.app.get(
      '/products/:page',
      this.iProductDocs.fetchProductsDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iFetchProducts.handle(adapter);
      }
    );
    this.app.get(
      '/products/product/:public_id',
      this.iProductDocs.searchProductDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iSelectProduct.handle(adapter);
      }
    );
    this.app.get(
      '/products/search/:name',
      this.iProductDocs.searchProductDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iSearchProducts.handle(adapter);
      }
    );
    this.app.post(
      '/products/save',
      this.iProductDocs.saveProductDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iSaveProduct.handle(adapter);
      }
    );
  }
}
