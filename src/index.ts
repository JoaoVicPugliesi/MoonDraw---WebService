import { app } from '@server/ServerComposer';
import { ServerAdapter } from './adapters/ServerAdapter';
import { cache } from '../apis/redis/redis';

const PORT: number = parseInt(process.env.PORT as string) ?? 5000;
const HOST: string = process.env.HOST ?? '127.0.0.1';

class Application {
  constructor(
    private readonly app: ServerAdapter,
    private readonly port: number,
    private readonly host: string
  ) {}

  async server() {
    try {
      await this.app.run();
      await this.app.listen({
        port: this.port,
        host: this.host,
      });

      this.app.log.info(
        `🚀 server is running on http://${this.host}:${this.port}`
      );

      console.log(`🚀 server is running on http://${this.host}:${this.port}`);
    } catch (error) {
      this.app.log.error(error as Error);
      process.exit(1);
    }
  }
}

const application = new Application(app, PORT, HOST);
application.server();

cache.flushAll();