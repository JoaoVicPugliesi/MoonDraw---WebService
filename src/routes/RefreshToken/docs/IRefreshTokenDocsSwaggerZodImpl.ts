import { DocSchema } from '@adapters/ServerAdapter';
import { IRefreshTokenDocs } from './IRefreshTokenDocs';

export class IRefreshTokenDocsSwaggerZodImpl implements IRefreshTokenDocs {
  refreshTokenDoc(): DocSchema {
    return {
      schema: {
        tags: ['Refreshtokens'],
      },
    };
  }
}

const iRefreshTokenDocs = new IRefreshTokenDocsSwaggerZodImpl();

export { iRefreshTokenDocs };

