import { IListPurchasesUseCase } from './IListPurchasesUseCase';
import {
  IListPurchaseResponse,
  IListPurchasesDTO,
  PurchasesNotFoundErrorResponse,
} from './IListPurchasesDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';

export class IListPurchasesController {
  constructor(
    private readonly iListPurchasesUseCase: IListPurchasesUseCase,
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
        message: 'Exceeded List Purchases Rate Limit',
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
      const { buyer_id, status }: IListPurchasesDTO = adapter.req
        .query as IListPurchasesDTO;
      const response: IListPurchaseResponse | PurchasesNotFoundErrorResponse =
        await this.iListPurchasesUseCase.execute({
          buyer_id,
          status,
        });

      if (response instanceof PurchasesNotFoundErrorResponse) {
        return adapter.res.status(404).send({ message: 'Purchases not found' });
      }

      return adapter.res.status(200).send({ purchases: response.purchases });
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
