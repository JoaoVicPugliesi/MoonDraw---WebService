import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iSearchProducts } from '@application/useCases/Product/SearchProducts/ISearchProductsComposer';
import { iSelectProduct } from '@application/useCases/Product/SelectProduct/ISelectProductComposer';
import { iFetchProducts } from '@application/useCases/Product/FetchProducts/IFetchProductsComposer';
import { iSaveProduct } from '@application/useCases/Product/SaveProduct/ISaveProductComposer';
import { IProductValidator } from '@application/validators/Product/IProductValidator';

export class ProductEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iProductValidator: IProductValidator
  ) {}

  setupRoutes() {
    this.app.get('/api/products/:page', {
      schema: {
        tags: ['Products']
      }
    },async (adapter: RequestResponseAdapter) => {
      await iFetchProducts.handle(adapter)
    });
    this.app.get('/api/products/product/:public_id', {
      schema: {
        tags: ['Products']
      }
    },async (adapter: RequestResponseAdapter) => {
      await iSelectProduct.handle(adapter)
    });
    this.app.get('/api/products/search/:name', {
      schema: {
        tags: ['Products']
      }
    },async (adapter: RequestResponseAdapter) => {
      await iSearchProducts.handle(adapter)
    });
    this.app.post('/api/products/save', {
      schema: {
        body: this.iProductValidator.validateSaveProduct(),
        tags: ['Products']
      }
    },async (adapter: RequestResponseAdapter) => {
      await iSaveProduct.handle(adapter)
    });
  }
}
