import { ITokenService } from '@domain/services/ITokenService';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { ISearchProductsDTO } from './ISearchProductsDTO';
import { ISearchProductsUseCase } from './ISearchProductsUseCase';
import {
  InvalidSearchedProductsNotFoundErrorResponse,
  ISearchProductsResponse,
} from '@application/handlers/UseCasesResponses/Product/ISearchProductsHandlers';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';

export class ISearchProductsController {
  constructor(
    private readonly iSearchProductsUseCase: ISearchProductsUseCase,
    private readonly iTokenService: ITokenService
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    try {
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(
        adapter,
        this.iTokenService
      );
      const ensure:
        | TokenIsMissingErrorResponse
        | TokenInvalidErrorResponse
        | void = iEnsureAccessTokenMiddleware.ensure();

      if (ensure instanceof TokenIsMissingErrorResponse) {
        return adapter.res.status(401).send({ message: 'Token is missing' });
      }
      if (ensure instanceof TokenInvalidErrorResponse) {
        return adapter.res.status(401).send({ message: 'Token is invalid' });
      }

      const { name }: ISearchProductsDTO = adapter.req
        .params as ISearchProductsDTO;
      const response:
        | ISearchProductsResponse
        | InvalidSearchedProductsNotFoundErrorResponse =
        await this.iSearchProductsUseCase.execute({
          name,
        });

      if (response instanceof InvalidSearchedProductsNotFoundErrorResponse) {
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
