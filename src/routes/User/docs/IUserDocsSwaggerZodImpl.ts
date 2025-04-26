import z from 'zod';
import { IUserDocs } from './IUserDocs';
import { DocSchema } from '@adapters/ServerAdapter';
import { IUserValidator } from '@application/validators/User/IUserValidator';
import { IUserValidatorZodImpl } from '@application/validators/User/IUserValidatorZodImpl';

export class IUserDocsSwaggerZodImpl implements IUserDocs {
  constructor(
    private readonly iUserValidator: IUserValidator
  ) {}

  registerDocs(): DocSchema {
    return {
      schema: {
        description: 'IRegisterUseCase',
        body: this.iUserValidator.validateRegister(),
        tags: ['Users'],
        response: {
          201: z
            .object({
              message: z.string(),
              current_user: z.object({
                access_token: z.string(),
                user: z.object({
                  name: z.string(),
                  surname: z.string(),
                  email: z.string(),
                  role: z.string(),
                  is_verified: z.boolean(),
                }),
                cart: z.object({
                  id: z.number(),
                  public_id: z.string(),
                  user_id: z.string(),
                }),
              }),
            })
            .describe('User Created Successfully'),
        },
      },
    };
  }

  loginDocs(): DocSchema {
    return {
      schema: {
        description: 'ILoginUseCase',
        body: this.iUserValidator.validateLogin(),
        tags: ['Users'],
      },
    };
  }

  confirMailDocs(): DocSchema {
    return {
      schema: {
        body: this.iUserValidator.validateConfirmMail(),
        tags: ['Users'],
      },
    };
  }

  logoutDocs(): DocSchema {
    return {
      schema: {
        tags: ['Users'],
      },
    };
  }
}

const iUserValidator = new IUserValidatorZodImpl();
const iUserDocs = new IUserDocsSwaggerZodImpl(iUserValidator);

export { iUserDocs };
