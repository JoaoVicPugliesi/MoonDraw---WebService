import fastify, { FastifyInstance } from "fastify";
import { ServerAdapter } from "./ServerAdapter";

class FastifyServer implements ServerAdapter {
  app: FastifyInstance;

  constructor() {
    this.app = fastify({ logger: true });
  }

  async listen(options: { port: number; host: string; }): Promise<void> {
      await this.app.listen(options);
  }

  get log() {
    return this.app.log;
  }
}

export const app = new FastifyServer();