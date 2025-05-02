import { app } from '@server/ServerComposer';
import { ServerAdapter } from './adapters/ServerAdapter';

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
      
      console.log(`🚀 server is running on http://localhost:${this.port}`);
    } catch (error) {
      console.log(error);
      this.app.log.error(error as Error);
      process.exit(1);
    }
  }
}

const application = new Application(app, +process.env.PORT!, process.env.HOST!);
application.server();
