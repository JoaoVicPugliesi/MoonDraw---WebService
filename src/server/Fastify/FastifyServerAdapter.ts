import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
} from "fastify";
import fastifyCors from "@fastify/cors";
import { ServerAdapter } from "@adapters/ServerAdapter";
import { fastifyCookie } from "fastify-cookie";
import { iFastify, routes } from "./FastifyServerComposer";
import { Routes } from "@routes/Routes";

class FastifyServerAdapter implements ServerAdapter {
  private cookie: any;
  
  constructor(
    private readonly app: FastifyInstance,
    private readonly routes: Routes
  ) {}

  run() {
    this.init();
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

  private async setupRoutes() {
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

  async listen(options: { port: number; host: string }): Promise<void> {
    await this.app.listen(options);
  }

  get log() {
    return this.app.log;
  }
}

export const app = new FastifyServerAdapter(iFastify, routes);
