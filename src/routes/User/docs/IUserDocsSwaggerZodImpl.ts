import z from 'zod';
import { IUserDocs } from './IUserDocs';
import { DocSchema } from '@adapters/ServerAdapter';
import { IUserValidator } from '@application/validators/User/IUserValidator';
import { IUserValidatorZodImpl } from '@application/validators/User/IUserValidatorZodImpl';

export class IUserDocsSwaggerZodImpl implements IUserDocs {
  constructor(
    private readonly iUserValidator: IUserValidator
  ) {}

  registerDoc(): DocSchema {
    return {
      schema: {
        description: 'IRegisterUseCase',
        body: this.iUserValidator.validateRegister(),
        tags: ['Users'],
        response: {
          201: z
            .object({
              message: z.string(),
            })
            .describe('User Saved'),
        },
      },
    };
  }

  loginDoc(): DocSchema {
    return {
      schema: {
        description: 'ILoginUseCase',
        body: this.iUserValidator.validateLogin(),
        tags: ['Users'],
      },
    };
  }

  confirmMailDoc(): DocSchema {
    return {
      schema: {
        body: this.iUserValidator.validateConfirmMail(),
        tags: ['Users'],
      },
    };
  }

  logoutDoc(): DocSchema {
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
