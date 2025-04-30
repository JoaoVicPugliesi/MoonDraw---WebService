import { ServerAdapter } from '@adapters/ServerAdapter';
import { iCheckoutPurchase } from '@application/useCases/Purchase/CheckoutPurchase/ICheckoutPurchaseComposer';
import { iCompletePurchase } from '@application/useCases/Purchase/CompletePurchase/ICompletePurchaseComposer';
import { iInitiatePurchase } from '@application/useCases/Purchase/InitiatePurchase/IInitiatePurchaseComposer';
import { iListPurchases } from '@application/useCases/Purchase/ListPurchases/IListPurchasesComposer';
import { iRemovePurchase } from '@application/useCases/Purchase/RemovePurchase/IRemovePurchaseComposer';
import { IPurchaseDocs } from './docs/IPurchaseDocs';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class PurchaseEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iPurchaseDocs: IPurchaseDocs
  ) {}

  setupRoutes() {
    this.app.post(
      '/purchases/initiate',
      async (adapter: RequestResponseAdapter) => {
        await iInitiatePurchase.handle(adapter);
      },
      {
        docs: this.iPurchaseDocs.initiatePurchaseDoc(),
      },
    );
    this.app.get(
      '/purchases/list',
      async (adapter: RequestResponseAdapter) => {
        await iListPurchases.handle(adapter);
      },
      {
        docs: this.iPurchaseDocs.listPurchasesDoc(),
      },
    );
    this.app.post(
      '/purchases/checkout',
      async (adapter: RequestResponseAdapter) => {
        await iCheckoutPurchase.handle(adapter);
      },
      {
        docs: this.iPurchaseDocs.checkoutPurchaseDoc(),
      },
    );
    this.app.delete(
      '/purchases/remove',
      async (adapter: RequestResponseAdapter) => {
        await iRemovePurchase.handle(adapter);
      },
      {
        docs: this.iPurchaseDocs.removePurchaseDoc(),
      },
    );
    this.app.post(
      '/purchases/purchase/complete',
      async (adapter: RequestResponseAdapter) => {
        await iCompletePurchase.handle(adapter);
      },
      {
        docs: this.iPurchaseDocs.completePurchaseDoc(),
      },
    );
  }
}
