import z from 'zod';

export class IDetachProductFromCartValidator {
  validate() {
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
