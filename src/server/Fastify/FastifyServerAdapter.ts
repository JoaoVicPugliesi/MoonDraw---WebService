import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
  FastifyRequest,
  FastifyReply
} from "fastify";
import fastifyCors from "@fastify/cors";
import { RequestResponseAdapter, ServerAdapter } from "@adapters/ServerAdapter";
import { fastifyCookie } from "fastify-cookie";
import { Routes } from "@routes/Routes";
import { FastifyRequestResponseAdapter } from "./FastifyRequestResponseAdapter";

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
    if (!this.routes) throw new Error("Routes not set!");
    this.routes.setupRoutes();
  }

  async register(
    x: any,
    options?: {
      credentials?: boolean;
      origin?: string | string[];
      methods?: string | string[];
      allowedHeaders?: string | string[];
    }
  ): Promise<void> {
    await this.app.register(
      x,
      options as FastifyRegisterOptions<FastifyPluginOptions>
    );
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

  private async init() {
    this.cookie = fastifyCookie;
    this.register(fastifyCors, {
      credentials: true,
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
    this.register(this.cookie);
    this.setupRoutes();
  }

  run() {
    this.init();
  }
}

