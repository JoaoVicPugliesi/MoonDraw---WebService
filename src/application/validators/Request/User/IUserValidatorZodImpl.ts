import z from 'zod';
import { IUserValidator } from './IUserValidator';

export class IUserValidatorZodImpl implements IUserValidator {
  validateRegister() {
    return z
      .object({
        icon_id: z
          .string({
            required_error: 'icon_id is required',
            invalid_type_error: 'icon_id should be of type string',
          })
          .max(250, { message: 'icon_id should have at maximum 250 characters' }),
        name: z
          .string({
            required_error: 'name is required',
            invalid_type_error: 'name should be of type string',
          })
          .max(50, { message: 'name should have at maximum 50 characters' }),

        surname: z
          .string({
            required_error: 'surname is required',
            invalid_type_error: 'surname should be of type string',
          })
          .max(200, {
            message: 'surname should have at maximum 200 characters',
          }),

        email: z
          .string({
            required_error: 'email is required',
            invalid_type_error: 'email should be of type string',
          })
          .email({ message: 'email is not valid' })
          .includes('@', { message: 'email must include @' })
          .endsWith('.com', { message: 'email needs to end with .com' }),
        description: z
          .string({
            required_error: 'description is required',
            invalid_type_error: 'description should be of type string',
          })
          .max(250, {
            message: 'description should have at maximum 250 characters',
          }),

        role: z.enum(['Buyer', 'Artist'], {
          required_error: 'role is required',
          invalid_type_error: 'role should be of restricted to Buyer or Artist',
        }),
        password: z
          .string({
            required_error: 'password is required',
            invalid_type_error: 'password should be of type string',
          })
          .min(15, { message: 'password should have minimum length of 15' })
          .max(255, { message: 'password is too long' })
          .regex(/^(?=.*[A-Z]).{8,}$/, {
            message:
              'Should Contain at least one uppercase letter and have a minimum length of 8 characters.',
          }),
        confirmPassword: z.string({
          required_error: 'confirm Password is required',
          invalid_type_error: 'confirm Password should be of type string',
        }),
      })
      .superRefine(({ 
        confirmPassword, 
        password 
      }, ctx) => {
        if (confirmPassword !== password) {
          ctx.addIssue({
            code: 'custom',
            message: 'The passwords did not match',
            path: ['confirmPassword'],
          });
        }
      });
  }

  validateConfirmMail() {
    return z.object({
      verification_token: z.string({
        required_error: 'token is required',
        invalid_type_error: 'token should be a string',
      }),
    });
  }

  validateLogin() {
    return z.object({
      email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'email should be of type string',
      }),
      password: z.string({
        required_error: 'password is required',
        invalid_type_error: 'password should be of type string',
      }),
    });
  }
}
