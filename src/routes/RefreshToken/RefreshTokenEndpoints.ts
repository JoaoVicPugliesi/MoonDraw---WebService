import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { refreshToken } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenComposer';

export class RefreshTokenEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.post('/api/refresh-token', async(adapter: RequestResponseAdapter) => {
      await refreshToken.handle(adapter);
    });

  }
}
