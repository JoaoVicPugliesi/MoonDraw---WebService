import fastify, {
  FastifyInstance,
} from "fastify";
import fastifyCors from "@fastify/cors";
import { ServerAdapter } from "../../adapters/ServerAdapter";
import { Post } from "routes/Post";

class FastifyServerAdapter implements ServerAdapter {
  private app!: FastifyInstance;
  private post!: Post;

  run() {
    this.init();
  }

  private async init() {
    this.app = fastify({ logger: true });
    this.register(fastifyCors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: 'Content-Type'
    });
    this.post = new Post(this.app);
    this.setupRoutes();
  }

  private async setupRoutes() {
    this.post.setupRoutes();
  }

  async register(x: any, options: { origin: string | string[]; methods: string | string[]; allowedHeaders: string | string[]; }): Promise<void> {
      await this.app.register(x, options);
  }

  async listen(options: { port: number; host: string }): Promise<void> {
    await this.app.listen(options);
  }

  get log() {
    return this.app.log;
  }
}

export const app = new FastifyServerAdapter();

