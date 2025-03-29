import { register } from "@application/useCases/User/Register";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestResponseAdapter } from "server/Fastify/FastifyRequestResponseAdapter";

export class Post {
  constructor(private readonly app: FastifyInstance) {}

  setupRoutes() {
    this.app.post("/users", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await register.handle(adapter);
    });
  }
}
