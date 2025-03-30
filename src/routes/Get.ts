import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { ITokenServiceImpl } from '@infra/services_implementation/ITokenServiceImpl';
import { FastifyRequestResponseAdapter } from '@server/Fastify/FastifyRequestResponseAdapter';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export class Get {
  constructor(private readonly app: FastifyInstance) {}

  setupRoutes() {
    this.app.get('/api/products', (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      const iTokenService = new ITokenServiceImpl();
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(adapter, iTokenService);
      iEnsureAccessTokenMiddleware.ensure();
      return res.status(200).send([
        { id: 1, name: 'AirJordan' },
        { id: 2, name: 'T-Shirt' },
        { id: 3, name: 'Jeans' },
      ]);
    });
  }
}
