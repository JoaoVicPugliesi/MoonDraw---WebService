import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ServerAdapter } from "../../adapters/ServerAdapter";
import { createUser } from "../../application/useCases/User/CreateUser";
import { FastifyRequestResponseAdapter } from "./FastifyRequestResponseAdapter";

class FastifyServerAdapter implements ServerAdapter {
  private app!: FastifyInstance;

  constructor() {
    this.init();
  }

  private async init() {
    this.app = fastify({ logger: true });
    this.setupRoutes();
  }

  private async setupRoutes() {
    this.app.post("/user", async (req: FastifyRequest, res: FastifyReply) => {
      const fastify = new FastifyRequestResponseAdapter(req, res);
      await createUser.handle(fastify);
    });
  }

  async listen(options: { port: number; host: string }): Promise<void> {
    await this.app.listen(options);
  }

  get log() {
    return this.app.log;
  }
}

export const app = new FastifyServerAdapter();
