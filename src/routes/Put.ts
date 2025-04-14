import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestResponseAdapter } from "server/Fastify/FastifyRequestResponseAdapter";
import { confirmMail } from "@application/useCases/User/ConfirmMail/IConfirmMailComposer";

export class Put {
  constructor(private readonly app: FastifyInstance) {}

  setupRoutes() {
    this.app.put("/api/users/confirmMail", async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await confirmMail.handle(adapter);
    });
  }
}
