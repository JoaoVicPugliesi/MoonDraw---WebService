import z from 'zod';

export class IConfirmMailValidator {
  validate() {
    return z.object({
      email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email should be a string',
      }),
      token: z.string({
        required_error: 'Token is required',
        invalid_type_error: 'Token should be a string',
      }),
    });
  }
}
