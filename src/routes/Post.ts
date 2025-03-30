import { refreshToken } from './../application/useCases/RefreshToken/RefreshSessionTokenUser/index';
import { login } from "@application/useCases/User/Login";
import { register } from "@application/useCases/User/Register";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestResponseAdapter } from "server/Fastify/FastifyRequestResponseAdapter";

export class Post {
  constructor(private readonly app: FastifyInstance) {}

  setupRoutes() {
    this.app.post("/api/users/register", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await register.handle(adapter);
    });

    this.app.post("/api/users/login", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await login.handle(adapter);
    });

    this.app.post('/api/refresh-token', async(req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await refreshToken.handle(adapter);
    });
  }
}
