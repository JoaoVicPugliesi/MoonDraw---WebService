import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iRefreshAccessToken } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenComposer';
import { IRefreshTokenDocs } from './docs/IRefreshTokenDocs';

export class RefreshTokenEndpoints {
  constructor(
    private readonly app: ServerAdapter,
    private readonly iRefreshTokenDocs: IRefreshTokenDocs
  ) {}

  setupRoutes() {
    this.app.post(
      '/refreshtokens/refreshAccessToken',
      this.iRefreshTokenDocs.refreshTokenDocs(),
      async (adapter: RequestResponseAdapter) => {
        await iRefreshAccessToken.handle(adapter);
      }
    );
  }
}
