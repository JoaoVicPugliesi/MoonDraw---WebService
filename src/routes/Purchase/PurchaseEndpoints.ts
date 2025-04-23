import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iCheckoutPurchase } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseComposer';
import { iInitiatePurchase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseComposer';
import { iListPurchases } from '@application/useCases/Purchase/ListPurchases/IListPurchasesComposer';

export class PurchaseEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.post('/api/purchases/initiate', async (adapter: RequestResponseAdapter) => {
        await iInitiatePurchase.handle(adapter);
    });
    this.app.get('/api/purchases/:query', async (adapter: RequestResponseAdapter) => {
        await iListPurchases.handle(adapter);
    });
    this.app.post('/api/purchases/checkout', async(adapter: RequestResponseAdapter) => {
        await iCheckoutPurchase.handle(adapter);
    })
  }
}
