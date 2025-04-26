import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iCheckoutPurchase } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseComposer';
import { iCompletePurchase } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseComposer';
import { iInitiatePurchase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseComposer';
import { iListPurchases } from '@application/useCases/Purchase/ListPurchases/IListPurchasesComposer';
import { iRemovePurchase } from '@application/useCases/Purchase/RemovePurchase/IRemovePurchaseComposer';
import { IPurchaseValidator } from '@application/validators/Purchase/IPurchaseValidator';

export class PurchaseEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iPurchaseValidator: IPurchaseValidator
  ) {}

  setupRoutes() {
    this.app.post('/api/purchases/initiate', {
      schema: {
        body: this.iPurchaseValidator.validateInitiatePurchase(),
        tags: ['Purchases']
      }
    },async (adapter: RequestResponseAdapter) => {
        await iInitiatePurchase.handle(adapter);
    });
    this.app.get('/api/purchases', {
      schema: {
        tags: ['Purchases']
      }
    },async (adapter: RequestResponseAdapter) => {
        await iListPurchases.handle(adapter);
    });
    this.app.post('/api/purchases/checkout', {
      schema: {
        tags: ['Purchases']
      }
    },async(adapter: RequestResponseAdapter) => {
        await iCheckoutPurchase.handle(adapter);
    });
    this.app.delete('/api/purchases/remove', {
      schema: {
        tags: ['Purchases']
      }
    },async (adapter: RequestResponseAdapter) => {
        await iRemovePurchase.handle(adapter);
    });
    this.app.post('/api/purchases/purchase/complete', {
      schema: {
        tags: ['Purchases']
      }
    },async (adapter: RequestResponseAdapter) => {
        await iCompletePurchase.handle(adapter);
    });
  }
}
