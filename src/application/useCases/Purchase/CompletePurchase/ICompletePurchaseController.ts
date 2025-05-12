import { ZodError } from 'zod';
import { IPurchaseValidator } from '@application/validators/Request/Purchase/IPurchaseValidator';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { ICompletePurchaseUseCase } from './ICompletePurchaseUseCase';
import {
  ICompletePurchaseResponse,
  PurchaseHasNoOwnerErrorResponse,
} from './ICompletePurchaseDTO';
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

export class ICompletePurchaseController {
  constructor(
    private readonly iCompletePurchaseUseCase: ICompletePurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iPurchaseValidator: IPurchaseValidator,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = await this.iPurchaseValidator.validateCompletePurchase();
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
        message: 'Exceeded Complete Purchase Rate Limit',
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
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (iEnsureAuth instanceof MustBeABuyerErrorResponse) {
      return adapter.res
        .status(403)
        .send({ message: 'Must be a Buyer to access' });
    }
    if (iEnsureAuth instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }

    try {
      const { purchase_id, session_id } = schema.parse(adapter.req.body);
      const response: ICompletePurchaseResponse =
        await this.iCompletePurchaseUseCase.execute({
          purchase_id,
          session_id,
        });

      if (response instanceof PurchaseHasNoOwnerErrorResponse) {
        return adapter.res
          .status(400)
          .send({ message: 'Purchase owner does not exist' });
      }

      return adapter.res.status(201).send({
        message: 'Purchase Completed and Delivery Saved',
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }
      return adapter.res.status(500).send({ message: error });
    }
  }
}
