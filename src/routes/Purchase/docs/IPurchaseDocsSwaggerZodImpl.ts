import { IPurchaseValidator } from '@application/validators/Request/Purchase/IPurchaseValidator';
import { IPurchaseDocs } from './IPurchaseDocs';
import { DocSchema } from '@adapters/ServerAdapter';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';

export class IPurchaseDocsSwaggerZodImpl implements IPurchaseDocs {
  constructor(
    private readonly iPurchaseValidator: IPurchaseValidator
  ) {}
  initiatePurchaseDoc(): DocSchema {
    return {
      schema: {
        description:
          'It should initiate a purchase passing the user whose the purchase will belong to, a name and a list of selected products id and the quantity.',
        body: this.iPurchaseValidator.validateInitiatePurchase(),
        tags: ['Purchases'],
      },
    };
  }

  listPurchasesDoc(): DocSchema {
    return {
      schema: {
        description: 'It should list pending or complete purchases',
        tags: ['Purchases'],
      },
    };
  }

  checkoutPurchaseDoc(): DocSchema {
    return {
      schema: {
        description: 'It should checkout the purchase specified by public_id',
        tags: ['Purchases'],
      },
    };
  }

  removePurchaseDoc(): DocSchema {
    return {
      schema: {
        description: 'RemovePurchaseUseCase',
        tags: ['Purchases'],
      },
    };
  }

  completePurchaseDoc(): DocSchema {
    return {
      schema: {
        description: 'CompletePurchaseUseCase',
        body: this.iPurchaseValidator.validateCompletePurchase(),
        tags: ['Purchases'],
      },
    };
  }
}

const iPurchaseValidator = new IPurchaseValidatorZodImpl();
const iPurchaseDocs = new IPurchaseDocsSwaggerZodImpl(iPurchaseValidator);

export { iPurchaseDocs };
