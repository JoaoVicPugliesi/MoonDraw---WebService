import { DocSchema } from '@adapters/ServerAdapter';
import { IProductDocs } from './IProductDocs';
import { IProductValidator } from '@application/validators/Request/Product/IProductValidator';
import { IProductValidatorZodImpl } from '@application/validators/Request/Product/IProductValidatorZodImpl';
import z from 'zod';

export class IProductDocsSwaggerZodImpl implements IProductDocs {
  constructor(
    private readonly iProductValidator: IProductValidator
  ) {}
  fetchProductsDoc(): DocSchema {
    return {
      schema: {
        tags: ['Products'],
        params: z
        .object({
          page: z.number()
        })
      },
    };
  }

  selectProductDoc(): DocSchema {
    return {
      schema: {
        tags: ['Products'],
        params: z
        .object({
          public_id: z.string()
        })
      },
    };
  }

  searchProductDoc(): DocSchema {
    return {
      schema: {
        tags: ['Products'],
      },
    };
  }

  saveProductDoc(): DocSchema {
    return {
      schema: {
        body: this.iProductValidator.validateSaveProduct(),
        tags: ['Products'],
      },
    };
  }
}

const iProductValidator = new IProductValidatorZodImpl();
const iProductDocs = new IProductDocsSwaggerZodImpl(iProductValidator);

export { iProductDocs };