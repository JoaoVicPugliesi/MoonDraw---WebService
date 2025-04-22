import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iInitiatePurchase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseComposer';

export class PurchaseEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.post('/api/purchases/initiate', async (adapter: RequestResponseAdapter) => {
        await iInitiatePurchase.handle(adapter);
    });

  }
}
