import { DocSchema } from '@adapters/ServerAdapter';
import { IProductDocs } from './IProductDocs';
import { IProductValidator } from '@application/validators/Product/IProductValidator';
import { IProductValidatorZodImpl } from '@application/validators/Product/IProductValidatorZodImpl';
import z from 'zod';

export class IProductDocsSwaggerZodImpl implements IProductDocs {
  constructor(
    private readonly iProductValidator: IProductValidator
  ) {}
  fetchProductsDocs(): DocSchema {
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

  selectProductDocs(): DocSchema {
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

  searchProductDocs(): DocSchema {
    return {
      schema: {
        tags: ['Products'],
      },
    };
  }

  saveProductDocs(): DocSchema {
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