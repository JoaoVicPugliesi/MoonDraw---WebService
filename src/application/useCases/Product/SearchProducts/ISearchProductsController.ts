import { ITokenService } from '@domain/services/Token/ITokenService';

import { ISearchProductsDTO, ISearchProductsResponse, SearchedProductsNotFoundErrorResponse } from './ISearchProductsDTO';
import { ISearchProductsUseCase } from './ISearchProductsUseCase';

import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ISearchProductsController {
  constructor(
    private readonly iSearchProductsUseCase: ISearchProductsUseCase,
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
      const { name }: ISearchProductsDTO = adapter.req
        .params as ISearchProductsDTO;
      const response:
        | ISearchProductsResponse
        | SearchedProductsNotFoundErrorResponse =
        await this.iSearchProductsUseCase.execute({
          name,
        });

      if (response instanceof SearchedProductsNotFoundErrorResponse) {
        return adapter.res
          .status(404)
          .send({ message: 'Not results found related to the search' });
      }

      return adapter.res.status(200).send({ result: response.result });
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
