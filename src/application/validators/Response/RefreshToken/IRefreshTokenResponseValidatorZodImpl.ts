import z from 'zod';
import { IRefreshTokenResponseValidator } from './IRefreshTokenResponseValidator';

export class IRefreshTokenResponseValidatorZodImpl
  implements IRefreshTokenResponseValidator
{
  validateRefreshAccessTokenResponse(): Record<number, any> {
    return {
      200: z
        .object({
          current_user: z.object({
            access_token: z.string(),
            user: z.object({
              name: z.string(),
              surname: z.string(),
              email: z.string(),
              description: z.string()
            }),
          }),
        })
        .describe(
          'User Access Token refreshed and Refresh Token in case of expired will also be refreshed (Setted again on cookies)'
        ),
      400: z
        .object({
          message: z.string(),
        })
        .describe('Refresh Token may be on the wrong format'),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Refresh Token may be missing'),
      404: z
        .object({
          message: z.string(),
        })
        .describe(
          'Refresh Token was not found or refresh token user (owner) was not found'
        ),
      500: z
        .object({
          message: z.string(),
          error: z.object({})
        })
        .describe('Internal Server Error'),
    };
  }
}
