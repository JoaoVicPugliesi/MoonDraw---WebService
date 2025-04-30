import { ITokenService } from '@domain/services/Token/ITokenService';
import { IFetchProductsUseCase } from './IFetchProductsUseCase';
import { FetchProductsResponse, IFetchProductsDTO, ProductsNotFoundErrorResponse } from './IFetchProductsDTO';

import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IFetchProductsController {
  constructor(
    private readonly iFetchProductsUseCase: IFetchProductsUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = this.iEnsureMiddleware.ensureAccessToken(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
    );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }
    try {
      const { page }: IFetchProductsDTO = adapter.req
        .params as IFetchProductsDTO;
      const response:
        | FetchProductsResponse
        | ProductsNotFoundErrorResponse =
        await this.iFetchProductsUseCase.execute({
          page,
        });

      if (response instanceof ProductsNotFoundErrorResponse)
        return adapter.res.status(404).send({
          message: 'Products Not Found',
        });

      return adapter.res.status(200).send({
        products: response.products,
      });
    } catch (error) {
      return adapter.res.status(500).send({
        message: error,
      });
    }
  }
}
