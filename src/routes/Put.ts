import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestResponseAdapter } from "server/Fastify/FastifyRequestResponseAdapter";
import { confirMail } from "@application/useCases/User/ConfirmMail";

export class Put {
  constructor(private readonly app: FastifyInstance) {}

  setupRoutes() {
    this.app.put("/api/users/confirmMail", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await confirMail.handle(adapter);
    });
  }
}
