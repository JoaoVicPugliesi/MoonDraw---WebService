import { IUserDocs } from './IUserDocs';
import { DocSchema } from '@adapters/ServerAdapter';
import { IUserValidator } from '@application/validators/Request/User/IUserValidator';
import { IUserValidatorZodImpl } from '@application/validators/Request/User/IUserValidatorZodImpl';
import { IUserResponseValidator } from '@application/validators/Response/User/IUserResponseValidator';
import { IUserResponseValidatorZodImpl } from '@application/validators/Response/User/IUserResponseValidatorZodImpl';

export class IUserDocsSwaggerZodImpl implements IUserDocs {
  constructor(
    private readonly iUserValidator: IUserValidator,
    private readonly iUserResponseValidator: IUserResponseValidator
  ) {}

  registerDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may authenticate a user temporarily. The target will be stored in memory for 15 minutes while we wait for the email confirmation.',
        body: this.iUserValidator.validateRegister(),
        tags: ['Users'],
        response: this.iUserResponseValidator.validateRegisterResponse()
      },
    };
  }

  confirmMailDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may grab the confirmation token sent by email and send the correct JSON, accessing the right key on Redis and finally storing the user persistently',
        body: this.iUserValidator.validateConfirmMail(),
        tags: ['Users'],
        response: this.iUserResponseValidator.validateConfirmMailResponse()
      },
    };
  }

  loginDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may authenticate and earn authorization by accessing a token of 1 hour and receiving a refresh token which lives for 7 days',
        body: this.iUserValidator.validateLogin(),
        tags: ['Users'],
        response: this.iUserResponseValidator.validateLoginResponse()
      },
    };
  }

  logoutDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may desauthenticate removing from the cookies the current Refresh Token',
        tags: ['Users'],
        response: this.iUserResponseValidator.validateLogoutResponse()
      },
    };
  }
}

const iUserValidator = new IUserValidatorZodImpl();
const iUserResponseValidator = new IUserResponseValidatorZodImpl();
const iUserDocs = new IUserDocsSwaggerZodImpl(iUserValidator, iUserResponseValidator);

export { iUserDocs };
