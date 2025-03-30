import fastify, {
  FastifyInstance,
} from 'fastify';
import fastifyCors from '@fastify/cors';
import { ServerAdapter } from '../../adapters/ServerAdapter';
import { Post } from 'routes/Post';
import { Put } from '@routes/Put';
import { Get } from '@routes/Get';

class FastifyServerAdapter implements ServerAdapter {
  private app!: FastifyInstance;
  private get!: Get;
  private post!: Post;
  private put!: Put;

  run() {
    this.init();
  }

  private async init() {
    this.app = fastify({ logger: true });
    this.register(fastifyCors, {
      credentials: true,
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      allowedHeaders: 'Content-Type'
    });
    this.get = new Get(this.app);
    this.post = new Post(this.app);
    this.put = new Put(this.app);
    this.setupRoutes();
  }

  private async setupRoutes() {
    this.get.setupRoutes();
    this.post.setupRoutes();
    this.put.setupRoutes()
  }

  async register(x: any, options: { credentials: boolean, origin: string | string[]; methods: string | string[]; allowedHeaders: string | string[]; }): Promise<void> {
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

