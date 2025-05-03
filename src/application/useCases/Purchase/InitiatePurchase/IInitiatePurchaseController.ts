import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IInitiatePurchaseUseCase } from './IInitiatePurchaseUseCase';
import { IInitiatePurchaseDTO } from './IInitiatePurchaseDTO';
import {
  MustBeABuyerErrorResponse,
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { IPurchaseValidator } from '@application/validators/Request/Purchase/IPurchaseValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IInitiatePurchaseController {
  constructor(
    private readonly iInitiatePurchaseUseCase: IInitiatePurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iPurchaseValidator: IPurchaseValidator,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iPurchaseValidator.validateInitiatePurchase();
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
        message: 'Exceeded Initiate Purchase Rate Limit',
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
        .send({ message: 'Must verify email to access' });
    }
    if (iEnsureAuth instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is invalid' });
    }
    try {
      const { buyer_id, title, selected_products }: IInitiatePurchaseDTO =
        schema.parse(adapter.req.body);
      await this.iInitiatePurchaseUseCase.execute({
        buyer_id,
        title,
        selected_products,
      });

      return adapter.res
        .status(201)
        .send({ message: 'Purchase initialized successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }
      return adapter.res.status(500).send({ message: error });
    }
  }
}
