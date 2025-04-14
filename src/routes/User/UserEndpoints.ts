import { IEnsureRefreshTokenMiddleware } from '@application/middlewares/IEnsureRefreshTokenMiddleware';
import { login } from "@application/useCases/User/Login/ILoginComposer";
import { register } from "@application/useCases/User/Register/IRegisterComposer";
import { RefreshToken } from '@domain/entities/RefreshToken';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestResponseAdapter } from "server/Fastify/FastifyRequestResponseAdapter";
import { logout } from '@application/useCases/User/Logout/ILogoutComposer';
import { confirmMail } from '@application/useCases/User/ConfirmMail/IConfirmMailComposer';

export class UserEndpoints {
  constructor(
    private readonly app: FastifyInstance
  ) {}

  setupRoutes() {
    this.app.post("/api/users/register", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await register.handle(adapter);
    });

    this.app.post("/api/users/login", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await login.handle(adapter);
    });

    this.app.post('/api/logout', async(req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      const iEnsureRefreshTokenMiddleware = new IEnsureRefreshTokenMiddleware(adapter);
      const refreshTokenCookie: RefreshToken = iEnsureRefreshTokenMiddleware.ensure();
      await logout.handle(adapter, refreshTokenCookie);
    });

    this.app.put("/api/users/confirmMail", async (req: FastifyRequest, res: FastifyReply) => {
        const adapter = new FastifyRequestResponseAdapter(req, res);
        await confirmMail.handle(adapter);
      });
  }
}
