import { IRemovePurchaseUseCase } from './IRemovePurchaseUseCase';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IRemovePurchaseDTO } from './IRemovePurchaseDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IRemovePurchaseController {
  constructor(
    private readonly iRemovePurchaseUseCase: IRemovePurchaseUseCase,
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
      return adapter.res.status(429).send({
        message: 'Exceeded Remove Purchase Rate Limit',
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
      const { public_id }: IRemovePurchaseDTO = adapter.req
        .body as IRemovePurchaseDTO;

      await this.iRemovePurchaseUseCase.execute({
        public_id,
      });

      return adapter.res.status(204).send();
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
