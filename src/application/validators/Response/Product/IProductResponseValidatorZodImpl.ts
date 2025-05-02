import z from 'zod';
import { IProductResponseValidator } from './IProductResponseValidator';

export class IProductResponseValidatorZodImpl
  implements IProductResponseValidator
{
  validateFetchProducts(): Record<number, any> {
    return {
      200: z
        .object({
          products: z.array(
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
        .describe('List of Products returned based on the specified page'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Access token may be missing or invalid'),
      404: z
        .object({
          message: z.string(),
        })
        .describe('Products may be not found based on the specified page'),
      500: z
        .object({
          message: z.string(),
          error: z.object({}),
        })
        .describe('Internal Server Error'),
    };
  }

  validateSelectProduct(): Record<number, any> {
    return {
      200: z
        .object({
          product: z.object({
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
          }),
        })
        .describe('Product returned based on the public_id'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Access token may be missing or invalid'),
      404: z
        .object({
          message: z.string(),
        })
        .describe('Product may be not found based on the specified public_id'),
      500: z
        .object({
          message: z.string(),
          error: z.object({}),
        })
        .describe('Internal Server Error'),
    };
  }

  validateSearchProducts(): Record<number, any> {
    return {
      200: z
        .object({
          products: z.array(
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
        .describe('List of Products returned based on the specified search'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Access token may be missing or invalid'),
      404: z
        .object({
          message: z.string(),
        })
        .describe('Products may be not found based on the specified search'),
      500: z
        .object({
          message: z.string(),
          error: z.object({}),
        })
        .describe('Internal Server Error'),
    };
  }

  validateSaveProduct(): Record<number, any> {
    return {
      201: z
        .object({
          message: z.string(),
        })
        .describe('Product saved'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Token may be missing or invalid'),
      403: z
        .object({
          message: z.string(),
        })
        .describe(
          'Token may be valid, however, does not possess authorization'
        ),
      409: z
        .object({
          message: z.string(),
        })
        .describe('Product already exists'),
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
