import fastify, { FastifyInstance } from "fastify";
import { ServerAdapter } from "../adapters/ServerAdapter";

class FastifyServer implements ServerAdapter {
 private app!: FastifyInstance;

  constructor() {
    this.init();
  }

  private async init() {
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