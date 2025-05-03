import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  ISearchProductsDTO,
  ISearchProductsResponse,
  SearchedProductsNotFoundErrorResponse,
} from './ISearchProductsDTO';
import { ISearchProductsUseCase } from './ISearchProductsUseCase';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class ISearchProductsController {
  constructor(
    private readonly iSearchProductsUseCase: ISearchProductsUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const iEnsureRateLimiting: void | LimitExceededErrorResponse =
      await this.iEnsureRateLimitingMiddleware.ensureFixedWindow(
        adapter,
        this.iRateLimiterProvider,
        5,
        60,
        60 * 2
      );

    if (iEnsureRateLimiting instanceof LimitExceededErrorResponse) {
      const number: number = iEnsureRateLimiting.accessBanTime();
      console.log(number);
      return adapter.res.status(429).send({
        message: 'Exceeded Search Products Rate Limit',
        retryAfter: number,
      });
    }
    const iEnsureAuth:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = this.iEnsureAuthMiddleware.ensureAccessToken(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
    );

    if (iEnsureAuth instanceof TokenIsMissingErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is missing' });
    }
    if (iEnsureAuth instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is invalid' });
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
