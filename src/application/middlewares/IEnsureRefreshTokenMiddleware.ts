import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { RefreshToken } from '@domain/entities/RefreshToken';

export class IEnsureRefreshTokenMiddleware {
  constructor(private readonly adapter: RequestResponseAdapter) {}

  ensure() {
    const refreshTokenCookie = this.adapter.req.cookies.refresh_token;

    if (!refreshTokenCookie)
      return this.adapter.res.status(403).send({ message: 'Forbidden' });

    try {
      const refreshToken: RefreshToken = JSON.parse(refreshTokenCookie);
      return refreshToken;
    } catch (error) {
      return this.adapter.res
        .status(400)
        .send({ 
            message: 'Invalid token format',
            error: error
        });
    }
  }
}
