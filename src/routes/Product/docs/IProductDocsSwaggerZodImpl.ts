import { DocSchema } from '@adapters/ServerAdapter';
import { IProductDocs } from './IProductDocs';
import { IProductValidator } from '@application/validators/Request/Product/IProductValidator';
import { IProductValidatorZodImpl } from '@application/validators/Request/Product/IProductValidatorZodImpl';
import z from 'zod';
import { IProductResponseValidator } from '@application/validators/Response/Product/IProductResponseValidator';
import { IProductResponseValidatorZodImpl } from '@application/validators/Response/Product/IProductResponseValidatorZodImpl';

export class IProductDocsSwaggerZodImpl implements IProductDocs {
  constructor(
    private readonly iProductValidator: IProductValidator,
    private readonly iProductResponseValidator: IProductResponseValidator
  ) {}
  fetchProductsDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may fetch products specified by page number',
        tags: ['Products'],
        params: z
        .object({
          page: z.number()
        }),
        response: this.iProductResponseValidator.validateFetchProducts()
      },
    };
  }

  selectProductDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may select product specified by public_id',
        tags: ['Products'],
        params: z
        .object({
          public_id: z.string()
        }),
        response: this.iProductResponseValidator.validateSelectProduct()
      },
    };
  }

  searchProductDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may search products specified by name',
        tags: ['Products'],
        response: this.iProductResponseValidator.validateSearchProducts()
      },
    };
  }

  saveProductDoc(): DocSchema {
    return {
      schema: {
        body: this.iProductValidator.validateSaveProduct(),
        tags: ['Products'],
        response: this.iProductResponseValidator.validateSaveProduct()
      },
    };
  }
}

const iProductValidator = new IProductValidatorZodImpl();
const iProductResponseValidator = new IProductResponseValidatorZodImpl();
const iProductDocs = new IProductDocsSwaggerZodImpl(iProductValidator, iProductResponseValidator);

export { iProductDocs };