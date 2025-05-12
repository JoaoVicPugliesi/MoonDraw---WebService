import { ITokenService } from '@domain/services/Token/ITokenService';
import { IFetchProductsUseCase } from './IFetchProductsUseCase';
import {
  IFetchProductsResponse,
  IFetchProductsDTO,
  ProductsNotFoundErrorResponse,
} from './IFetchProductsDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IFetchProductsController {
  constructor(
    private readonly iFetchProductsUseCase: IFetchProductsUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddleware: IEnsureAuthMiddleware,
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
      return adapter.res.status(429).send({
        message: 'Exceeded Fetch Products Rate Limit',
        retryAfter: number,
      });
    }
    const iEnsureAuth:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = this.iEnsureMiddleware.ensureAccessToken(
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
      const { page }: IFetchProductsDTO = adapter.req
        .params as IFetchProductsDTO;
      const response: IFetchProductsResponse =
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
