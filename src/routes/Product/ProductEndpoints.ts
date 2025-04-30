import { ServerAdapter } from '@adapters/ServerAdapter';
import { iSearchProducts } from '@application/useCases/Product/SearchProducts/ISearchProductsComposer';
import { iSelectProduct } from '@application/useCases/Product/SelectProduct/ISelectProductComposer';
import { iFetchProducts } from '@application/useCases/Product/FetchProducts/IFetchProductsComposer';
import { iSaveProduct } from '@application/useCases/Product/SaveProduct/ISaveProductComposer';
import { IProductDocs } from './docs/IProductDocs';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ProductEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iProductDocs: IProductDocs
  ) {}

  setupRoutes() {
    this.app.get(
      '/products/:page',
      async (adapter: RequestResponseAdapter) => {
        await iFetchProducts.handle(adapter);
      },
      {
        docs: this.iProductDocs.fetchProductsDoc(),
      },
    );
    this.app.get(
      '/products/product/:public_id',
      async (adapter: RequestResponseAdapter) => {
        await iSelectProduct.handle(adapter);
      },
      {
        docs: this.iProductDocs.selectProductDoc(),
      },
    );
    this.app.get(
      '/products/search/:name',
      async (adapter: RequestResponseAdapter) => {
        await iSearchProducts.handle(adapter);
      },
      {
        docs: this.iProductDocs.searchProductDoc(),
      },
    );
    this.app.post(
      '/products/save',
      async (adapter: RequestResponseAdapter) => {
        await iSaveProduct.handle(adapter);
      },
      {
        docs: this.iProductDocs.saveProductDoc(),
      },
    );
  }
}
