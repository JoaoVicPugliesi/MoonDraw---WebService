import { app } from '@server/ServerComposer';
import { ServerAdapter } from './adapters/ServerAdapter';
import { cache } from '../apis/redis/redis';

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

const application = new Application(app, +process.env.PORT!, process.env.HOST!);
application.server();

cache.flushAll();