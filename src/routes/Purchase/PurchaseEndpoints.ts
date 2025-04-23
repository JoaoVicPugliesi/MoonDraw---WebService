import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
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
    
  }
}
