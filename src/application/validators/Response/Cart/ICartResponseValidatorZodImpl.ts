import z from 'zod';
import { ICartResponseValidator } from './ICartResponseValidator';

export class ICartResponseValidatorZodImpl implements ICartResponseValidator {
  validateGetCart(): Record<number, any> {
    return {
      200: z
        .object({
          cart: z.object({
            id: z.number(),
            public_id: z.string(),
            owner_id: z.string(),
          }),
        })
        .describe('Cart was returned based on the specified user_id'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      404: z
        .object({
          message: z.string(),
        })
        .describe('Cart may be empty'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }
  validateListCartContent(): Record<number, any> {
    return {
      200: z
        .object({
          content: z.array(
            z.object({
              id: z.number(),
              public_id: z.string(),
              images_id: z.array(z.string()),
              artist_id: z.string(),
              name: z.string(),
              description: z.string(),
              price: z.number(),
              supply: z.number(),
              publisher: z.string(),
              published_at: z.date(),
              updated_at: z.date(),
            })
          ),
        })
        .describe(
          'Cart related products were returned based on the specified public_id'
        ),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      409: z
        .object({
          message: z.string(),
        })
        .describe('Cart may be empty'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }
  validateAttachProductIntoCart(): Record<number, any> {
    return {
      201: z
        .object({
          message: z.string(),
        })
        .describe(
          'Attachment between Cart and Product was added based on the specified cart_id and product_id'
        ),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      409: z
        .object({
          message: z.string(),
        })
        .describe(
          'Attachment between Cart and Product may be already existent'
        ),
      422: z
        .object({
          message: z.string(),
          errors: z.record(z.string(), z.array(z.string())),
        })
        .describe('Validation Error'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }
  validateDetachProductFromCart(): Record<number, any> {
    return {
      204: z
        .object({})
        .describe('Detachment was removed based on the cart_id and product_id provided'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      404: z
        .object({
          message: z.string(),
        })
        .describe('Attachment previously may be not existent'),
      422: z
        .object({
          message: z.string(),
          errors: z.record(z.string(), z.array(z.string())),
        })
        .describe('Validation Error'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }
}
