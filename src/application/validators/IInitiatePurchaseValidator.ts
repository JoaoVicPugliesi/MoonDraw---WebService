import z from 'zod';

export class IInitiatePurchaseValidator {
  validate() {
    return z.object({
      user_id: z.string({
        required_error: 'User_id is required for each product',
        invalid_type_error: 'User_id must be a string',
      }),
      selected_products: z.array(
        z.object({
          product_id: z.string({
            required_error: 'Product_id is required for each product',
            invalid_type_error: 'Product_id must be a string',
          }),
          quantity: z.number().min(1),
        })
      ),
    });
  }
}
