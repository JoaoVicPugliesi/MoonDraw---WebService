import z from 'zod';
import { ICartValidator } from './ICartValidator';

export class ICartValidatorZodImpl implements ICartValidator {
  validateAttachmentBetweenProductAndCart() {
    return z.object({
      cart_id: z.string({
        invalid_type_error: 'cart_id should be a string',
        required_error: 'cart_id is required',
      }),
      product_id: z.string({
        invalid_type_error: 'product_id should be a string',
        required_error: 'product_id is required',
      }),
    });
  }
}
