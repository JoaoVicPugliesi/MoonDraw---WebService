import { IPurchaseValidator } from '@application/validators/Request/Purchase/IPurchaseValidator';
import { IPurchaseDocs } from './IPurchaseDocs';
import { DocSchema } from '@adapters/ServerAdapter';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';
import { IPurchaseResponseValidator } from '@application/validators/Response/Purchase/IPurchaseResponseValidator';
import { IPurchaseResponseValidatorZodImpl } from '@application/validators/Response/Purchase/IPurchaseResponseValidatorZodImpl';

export class IPurchaseDocsSwaggerZodImpl implements IPurchaseDocs {
  constructor(
    private readonly iPurchaseValidator: IPurchaseValidator,
    private readonly iPurchaseResponseValidator: IPurchaseResponseValidator
  ) {}
  initiatePurchaseDoc(): DocSchema {
    return {
      schema: {
        description:
          'Here you may initiate a purchase by providing the user whose the purchase will belong to, a name and a list of selected products id and the quantity.',
        body: this.iPurchaseValidator.validateInitiatePurchase(),
        tags: ['Purchases'],
        response: this.iPurchaseResponseValidator.validateInitiatePurchase()
      },
    };
  }

  listPurchasesDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may list pending or complete purchases',
        tags: ['Purchases'],
        response: this.iPurchaseResponseValidator.validateListPurchases()
      },
    };
  }

  checkoutPurchaseDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may checkout the purchase specified by public_id',
        tags: ['Purchases'],
        response: this.iPurchaseResponseValidator.validateCheckoutPurchase()
      },
    };
  }

  removePurchaseDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may remove a purchase specified by public_id',
        tags: ['Purchases'],
        response: this.iPurchaseResponseValidator.validateRemovePurchase()
      },
    };
  }

  completePurchaseDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may complete a purchase and be redirected to the deliveries page',
        body: this.iPurchaseValidator.validateCompletePurchase(),
        tags: ['Purchases'],
        response: this.iPurchaseResponseValidator.validateCompletePurchase()
      },
    };
  }
}

const iPurchaseValidator = new IPurchaseValidatorZodImpl();
const iPurchaseResponseValidator = new IPurchaseResponseValidatorZodImpl();
const iPurchaseDocs = new IPurchaseDocsSwaggerZodImpl(iPurchaseValidator, iPurchaseResponseValidator);

export { iPurchaseDocs };
