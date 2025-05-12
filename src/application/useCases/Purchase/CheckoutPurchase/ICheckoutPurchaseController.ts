import { ITokenService } from '@domain/services/Token/ITokenService';
import { ICheckoutPurchaseUseCase } from './ICheckoutPurchaseUseCase';
import {
  ICheckoutPurchaseDTO,
  ICheckoutPurchaseResponse,
  PurchaseNotFoundErrorResponse,
} from './ICheckoutPurchaseDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  MustBeABuyerErrorResponse,
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class ICheckoutPurchaseController {
  constructor(
    private readonly iCheckoutPurchaseUseCase: ICheckoutPurchaseUseCase,
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
        message: 'Exceeded Checkout Purchase Rate Limit',
        retryAfter: number,
      });
    }
    const iEnsureAuth:
      | void
      | TokenIsMissingErrorResponse
      | MustBeABuyerErrorResponse
      | TokenInvalidErrorResponse =
      this.iEnsureAuthMiddleware.ensureUserIsABuyer(
        adapter,
        this.iTokenService,
        process.env.JWT_SECRET_KEY!
      );

    if (iEnsureAuth instanceof TokenIsMissingErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is missing' });
    }
    if (iEnsureAuth instanceof MustBeABuyerErrorResponse) {
      return adapter.res
        .status(403)
        .send({ message: 'Must be a Buyer to access' });
    }
    if (iEnsureAuth instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is invalid' });
    }

    try {
      const { public_id }: ICheckoutPurchaseDTO = adapter.req
        .body as ICheckoutPurchaseDTO;
      const response:
        | ICheckoutPurchaseResponse
        | PurchaseNotFoundErrorResponse =
        await this.iCheckoutPurchaseUseCase.execute({
          public_id,
        });
      if (response instanceof PurchaseNotFoundErrorResponse) {
        return adapter.res.status(404).send({ message: 'Purchase not found' });
      }

      console.log(response.url);
      return adapter.res.redirect(response.url, 201);
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
