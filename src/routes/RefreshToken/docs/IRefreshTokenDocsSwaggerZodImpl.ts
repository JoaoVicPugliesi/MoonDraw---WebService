import { DocSchema } from '@adapters/ServerAdapter';
import { IRefreshTokenDocs } from './IRefreshTokenDocs';
import { IRefreshTokenResponseValidator } from '@application/validators/Response/RefreshToken/IRefreshTokenResponseValidator';
import { IRefreshTokenResponseValidatorZodImpl } from '@application/validators/Response/RefreshToken/IRefreshTokenResponseValidatorZodImpl';

export class IRefreshTokenDocsSwaggerZodImpl implements IRefreshTokenDocs {
  constructor(
    private readonly iRefreshTokenResponseValidator: IRefreshTokenResponseValidator
  ) {}

  refreshTokenDoc(): DocSchema {
    return {
      schema: {
        description: 'Here you may refresh the access token increasing the authentication live time. Also change the current refresh-token in case it is expired.',
        tags: ['Refreshtokens'],
        response: this.iRefreshTokenResponseValidator.validateRefreshAccessTokenResponse()
      },
    };
  }
}

const iRefreshTokenResponseValidator = new IRefreshTokenResponseValidatorZodImpl()
const iRefreshTokenDocs = new IRefreshTokenDocsSwaggerZodImpl(iRefreshTokenResponseValidator);

export { iRefreshTokenDocs };

