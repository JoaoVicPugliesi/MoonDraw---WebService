import z from 'zod';
import { IUserResponseValidator } from './IUserResponseValidator';

export class IUserResponseValidatorZodImpl implements IUserResponseValidator {
  validateRegisterResponse(): Record<number, any> {
    return {
      201: z
        .object({
          temporary_access_token: z.string()
        })
        .describe(
          'User temporarily saved in memory, just waiting for email confirmation.'
        ),
      409: z
        .object({
          message: z.string(),
        })
        .describe('User already exists or is already in saving process'),
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

  validateConfirmMailResponse(): Record<number, any> {
    return {
      201: z
        .object({
          message: z.string(),
        })
        .describe('User finally saved persistently.'),
      401: z
        .object({
          message: z.string()
        }).describe('Temporary token may be missing or expired. Verification token may be wrong or expired'),
      409: z
        .object({
          message: z.string(),
        })
        .describe('Token may be expired or wrong'),
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

  validateLoginResponse(): Record<number, any> {
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
          'User is logged in. Access Token is available and Refresh Token setted as a cookie'
        ),
      401: z
        .object({
          message: z.string(),
        })
        .describe('Password does not match'),
      404: z
        .object({
          message: z.string(),
        })
        .describe('User not Found'),
      422: z
        .object({
          message: z.string(),
          errors: z.record(z.string(), z.array(z.string())),
        })
        .describe('Validation Error'),
      424: z
        .object({
          message: z.string(),
        })
        .describe('Refresh Token was not generated correctly'),
      500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
    };
  }

  validateLogoutResponse(): Record<number, any> {
      return {
        204: z
        .object({})
        .describe(
          'User is logged out and Refresh Token removed'
        ),
        400: z
        .object({
          message: z.string()
        })
        .describe(
          'Refresh Token may be on the wrong format'
        ),
        401: z
        .object({
          message: z.string()
        })
        .describe(
          'Refresh Token may be missing'
        ),
        404: z
        .object({
          message: z.string()
        })
        .describe(
          'Refresh Token Not Found'
        ),
        500: z
        .object({
          message: z.string(),
        })
        .describe('Internal Server Error'),
      } 
  }
}
