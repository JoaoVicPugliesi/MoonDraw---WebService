import fastify, {
  FastifyInstance,
} from "fastify";
import { ServerAdapter } from "../../adapters/ServerAdapter";
import { Post } from "routes/post";

class FastifyServerAdapter implements ServerAdapter {
  private app!: FastifyInstance;
  private post!: Post;

  run() {
    this.init();
  }

  private async init() {
    this.app = fastify({ logger: true });
    this.post = new Post(this.app);
    this.setupRoutes();
  }

  private async setupRoutes() {
    this.post.setupRoutes();
  }

  async listen(options: { port: number; host: string }): Promise<void> {
    await this.app.listen(options);
  }

  get log() {
    return this.app.log;
  }
}

export const app = new FastifyServerAdapter();

