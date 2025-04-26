import z from "zod";
import { IPurchaseValidator } from "./IPurchaseValidator";

export class IPurchaseValidatorZodImpl implements IPurchaseValidator {
  validateInitiatePurchase() {
    return z.object({
      user_id: z.string({
        required_error: "User_id is required for each product",
        invalid_type_error: "User_id must be a string",
      }),
      title: z
        .string({
          required_error: "Name is required for each product",
          invalid_type_error: "Name must be a string",
        })
        .min(5),
      selected_products: z.array(
        z.object({
          product_id: z.string({
            required_error: "Product_id is required for each product",
            invalid_type_error: "Product_id must be a string",
          }),
          quantity: z.number().min(1),
        })
      ),
    });
  }
}
