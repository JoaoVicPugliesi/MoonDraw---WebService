import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply
} from 'fastify';
import fastifyCors from '@fastify/cors';
import { RequestResponseAdapter, ServerAdapter } from '@adapters/ServerAdapter';
import { fastifyCookie } from 'fastify-cookie';
import { Routes } from '@routes/Routes';
import { FastifyRequestResponseAdapter } from './FastifyRequestResponseAdapter';
import fastifyRateLimit from '@fastify/rate-limit';

export class FastifyServerAdapter implements ServerAdapter {
  private cookie: any;
  private routes?: Routes;
  constructor(
    private readonly app: FastifyInstance,
  ) {}

  setRoutes(routes: Routes) {
    this.routes = routes;
  }

  private async setupRoutes() {
    if (!this.routes) throw new Error('Routes not set!');
    this.routes.setupRoutes();
  }

  get(url: string, callback: (adapter: RequestResponseAdapter) => Promise<any>): void {
    this.app.get(url, async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await callback(adapter);
    });
  }
  
  post(url: string, callback: (adapter: RequestResponseAdapter) => Promise<any>): void {
    this.app.post(url, async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await callback(adapter);
    });
  }

  put(url: string, callback: (adapter: RequestResponseAdapter) => Promise<any>): void {
    this.app.put(url, async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await callback(adapter);
    });
  }

  delete(url: string, callback: (adapter: RequestResponseAdapter) => Promise<any>): void {
    this.app.delete(url, async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      await callback(adapter);
    });
  }
  
  async listen(options: { port: number; host: string }): Promise<void> {
    await this.app.listen(options);
  }
  
  get log() {
    return this.app.log;
  }

  async init() {
    this.cookie = fastifyCookie;
    await this.app.register(fastifyCors, {
      credentials: true,
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await this.app.register(fastifyRateLimit, {
      global: true,
      max: 100,
      timeWindow: '1 minute',
      ban: 2, 
      cache: 5000,
      addHeaders: {
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true
      },
      errorResponseBuilder: (req, context) => {
        return {
          statusCode: 429,
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Try again in ${context.after}`,
        };
      }
    });
    await this.app.register(this.cookie);
    await this.setupRoutes();
  }

  async run() {
    await this.init();
  }
}