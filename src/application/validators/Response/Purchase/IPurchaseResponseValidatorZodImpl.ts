import z from 'zod';
import { IPurchaseResponseValidator } from './IPurchaseResponseValidator';

export class IPurchaseResponseValidatorZodImpl
  implements IPurchaseResponseValidator
{
  validateInitiatePurchase(): Record<number, any> {
    return {
      201: z
        .object({
          message: z.string(),
        })
        .describe(
          'Purchase initiated based on the user_id, name and list of products provided'
        ),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      403: z
        .object({
          message: z.string(),
        })
        .describe('Current User may be not verified'),
      422: z
        .object({
          message: z.string(),
          errors: z.record(z.string(), z.array(z.string())),
        })
        .describe('Validation Error'),
      429: z
        .object({
          message: z.string(),
          retryAfter: z.number(),
        })
        .describe('InitiatePurchase Rate Limiter may have been violated'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }

  validateListPurchases(): Record<number, any> {
    return {
      200: z
        .object({
          purchases: z.array(
            z.object({
              id: z.number(),
              public_id: z.string(),
              buyer_id: z.string(),
              title: z.string(),
              value: z.number(),
              status: z.string(),
              created_at: z.date(),
              updated_at: z.date(),
              payment_method: z.string(),
              completed_at: z.date(),
            })
          ),
        })
        .describe(
          'User related purchases returned based on the user_id and status provided'
        ),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      404: z
        .object({
          message: z.string(),
        })
        .describe(
          'User may not have related purchases based on the user_id and status provided'
        ),
      429: z
        .object({
          message: z.string(),
          retryAfter: z.number(),
        })
        .describe('ListPurchases Rate Limiter may have been violated'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }

  validateCheckoutPurchase(): Record<number, any> {
    return {
      201: z
        .object({
          message: z.string(),
        })
        .describe(
          'Purchase checked out followed by redirection to payment page'
        ),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      403: z
        .object({
          message: z.string(),
        })
        .describe('Current User may be not verified'),
      404: z
        .object({
          message: z.string(),
          errors: z.record(z.string(), z.array(z.string())),
        })
        .describe('Validation Error'),
      429: z
        .object({
          message: z.string(),
          retryAfter: z.number(),
        })
        .describe('Rate Limiter may have been violated'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }

  validateRemovePurchase(): Record<number, any> {
    return {
      204: z.object({}).describe(''),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      429: z
        .object({
          message: z.string(),
          retryAfter: z.number(),
        })
        .describe('Rate Limiter may have been violated'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }

  validateCompletePurchase(): Record<number, any> {
    return {
      201: z
        .object({
          message: z.string(),
        })
        .describe('Purchase completed originating a new delivery'),
      400: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      403: z
        .object({
          message: z.string(),
        })
        .describe('Current User may be not verified'),
      422: z
        .object({
          message: z.string(),
          errors: z.record(z.string(), z.array(z.string())),
        })
        .describe('Validation Error'),
      429: z
        .object({
          message: z.string(),
          retryAfter: z.number(),
        })
        .describe('Rate Limiter may have been violated'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }
}
