import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { iRefreshToken } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenComposer';

export class RefreshTokenEndpoints {
  constructor(
    private readonly app: ServerAdapter
  ) {}

  setupRoutes() {
    this.app.post('/api/refreshtokens', {
      schema: {
        tags: ['Refreshtokens']
      }
    },async(adapter: RequestResponseAdapter) => {
      await iRefreshToken.handle(adapter);
    });
  }
}
