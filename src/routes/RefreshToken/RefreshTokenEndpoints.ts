import { IEnsureRefreshTokenMiddleware } from '@application/middlewares/IEnsureRefreshTokenMiddleware';
import { refreshToken } from '@application/useCases/RefreshToken/RefreshAccessToken/IRefreshAccessTokenComposer';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestResponseAdapter } from "server/Fastify/FastifyRequestResponseAdapter";

export class RefreshTokenEndpoints {
  constructor(
    private readonly app: FastifyInstance
  ) {}

  setupRoutes() {
    this.app.post('/api/refresh-token', async(req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      const iEnsureRefreshTokenMiddleware = new IEnsureRefreshTokenMiddleware(adapter);
      const refreshTokenCookie: RefreshToken = iEnsureRefreshTokenMiddleware.ensure();
      await refreshToken.handle(adapter, refreshTokenCookie);
    });

  }
}
