import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { fetchProducts } from '@application/useCases/Product/FetchProducts/IFetchProductsComposer';
import { IJWTTokenServiceImpl } from '@infra/services_implementation/IJWTTokenServiceImpl';
import { FastifyRequestResponseAdapter } from '@server/Fastify/FastifyRequestResponseAdapter';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export class Get {
  constructor(private readonly app: FastifyInstance) {}

  setupRoutes() {
    this.app.get('/api/products/:page', async (req: FastifyRequest, res: FastifyReply) => {
      const adapter = new FastifyRequestResponseAdapter(req, res);
      const iTokenService = new IJWTTokenServiceImpl();
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(adapter, iTokenService);
      iEnsureAccessTokenMiddleware.ensure();
      await fetchProducts.handle(adapter)
    });
  }
}
