import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iCheckoutPurchase } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseComposer';
import { iCompletePurchase } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseComposer';
import { iInitiatePurchase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseComposer';
import { iListPurchases } from '@application/useCases/Purchase/ListPurchases/IListPurchasesComposer';
import { iRemovePurchase } from '@application/useCases/Purchase/RemovePurchase/IRemovePurchaseComposer';
import { IPurchaseDocs } from './docs/IPurchaseDocs';

export class PurchaseEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iPurchaseDocs: IPurchaseDocs
  ) {}

  setupRoutes() {
    this.app.post(
      '/purchases/initiate',
      {
        docs: this.iPurchaseDocs.initiatePurchaseDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iInitiatePurchase.handle(adapter);
      }
    );
    this.app.get(
      '/purchases/list',
      {
        docs: this.iPurchaseDocs.listPurchasesDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iListPurchases.handle(adapter);
      }
    );
    this.app.post(
      '/purchases/checkout',
      {
        docs: this.iPurchaseDocs.checkoutPurchaseDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iCheckoutPurchase.handle(adapter);
      }
    );
    this.app.delete(
      '/purchases/remove',
      {
        docs: this.iPurchaseDocs.removePurchaseDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iRemovePurchase.handle(adapter);
      }
    );
    this.app.post(
      '/purchases/purchase/complete',
      {
        docs: this.iPurchaseDocs.completePurchaseDocs(),
      },
      async (adapter: RequestResponseAdapter) => {
        await iCompletePurchase.handle(adapter);
      }
    );
  }
}
