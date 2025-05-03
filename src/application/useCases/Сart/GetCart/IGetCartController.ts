import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { IGetCartUseCase } from './IGetCartUseCase';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  CartNotFoundErrorResponse,
  IGetCartDTO,
  IGetCartResponse,
} from './IGetCartDTO';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IGetCartController {
  constructor(
    private readonly iGetCartUseCase: IGetCartUseCase,
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
        message: 'Exceeded Get Cart Rate Limit',
        retryAfter: number,
      });
    }
    const iEnsureAuth:
      | void
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse =
      this.iEnsureAuthMiddleware.ensureAccessToken(
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
      const { owner_id }: IGetCartDTO = adapter.req.params as IGetCartDTO;
      const response: CartNotFoundErrorResponse | IGetCartResponse =
        await this.iGetCartUseCase.execute({
          owner_id,
        });

      if (response instanceof CartNotFoundErrorResponse) {
        return adapter.res.status(404).send({
          message: 'Cart Not Found',
        });
      }

      return adapter.res.status(200).send({
        cart: response.cart,
      });
    } catch (error) {
      return adapter.res.status(500).send({
        message: 'Internal Server Error',
        error: error,
      });
    }
  }
}
