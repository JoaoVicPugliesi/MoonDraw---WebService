import z from 'zod';
import { IPurchaseValidator } from './IPurchaseValidator';

export class IPurchaseValidatorZodImpl implements IPurchaseValidator {
  validateInitiatePurchase() {
    return z.object({
      buyer_id: z.string({
        required_error: 'buyer_id is required',
        invalid_type_error: 'buyer_id must be a string',
      }),
      title: z
        .string({
          required_error: 'title is required',
          invalid_type_error: 'title must be a string',
        })
        .min(5),
      selected_products: z.array(
        z.object({
          product_id: z.string({
            required_error: 'product_id is required',
            invalid_type_error: 'product_id must be a string',
          }),
          quantity: z.number().min(1),
        })
      ),
    });
  }

  validateCompletePurchase() {
      return z.object({
        session_id: z.string({
          required_error: 'session_id is required',
          invalid_type_error: 'session_id must be a string',
        }),
       purchase_id: z.string({
          required_error: 'purchase_id is required',
          invalid_type_error: 'purchase_id must be a string',
        }),
      });
  }
}
