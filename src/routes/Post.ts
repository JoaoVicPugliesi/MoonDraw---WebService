import { createUser } from "@application/useCases/User/CreateUser";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestResponseAdapter } from "server/Fastify/FastifyRequestResponseAdapter";

export class Post {
  constructor(private readonly app: FastifyInstance) {}

  setupRoutes() {
    this.app.post("/users", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await createUser.handle(adapter);
    });
  }
}
