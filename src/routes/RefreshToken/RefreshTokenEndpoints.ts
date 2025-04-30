import { ServerAdapter } from '@adapters/ServerAdapter';
import { iRefreshAccessToken } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenComposer';
import { IRefreshTokenDocs } from './docs/IRefreshTokenDocs';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class RefreshTokenEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iRefreshTokenDocs: IRefreshTokenDocs
  ) {}

  setupRoutes() {
    this.app.post(
      '/refreshtokens/refreshAccessToken',
      async (adapter: RequestResponseAdapter) => {
        await iRefreshAccessToken.handle(adapter);
      },
      {
        docs: this.iRefreshTokenDocs.refreshTokenDoc(),
      },
    );
  }
}
