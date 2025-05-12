import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IAttachProductIntoCartUseCase } from './IAttachProductIntoCartUseCase';
import {
  AttachmentAlreadyExistsErrorResponse,
  IAttachProductIntoCartDTO,
  IAttachProductIntoCartResponse,
} from './IAttachProductIntoCartDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { ICartValidator } from '@application/validators/Request/Cart/ICartValidator';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';

export class IAttachProductIntoCartController {
  constructor(
    private readonly iAttachProductIntoCartUseCase: IAttachProductIntoCartUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iCartValidator: ICartValidator,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema =
      this.iCartValidator.validateAttachmentBetweenProductAndCart();
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
        message: 'Exceeded Attach Product Into Cart Rate Limit',
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
      const { cart_id, product_id }: IAttachProductIntoCartDTO = schema.parse(
        adapter.req.body
      );

      const response: IAttachProductIntoCartResponse =
        await this.iAttachProductIntoCartUseCase.execute({
          cart_id,
          product_id,
        });

      if (response instanceof AttachmentAlreadyExistsErrorResponse) {
        return adapter.res
          .status(409)
          .send({ message: 'Product already exists inside the cart' });
      }

      return adapter.res.status(201).send({
        message: 'Product Added',
      });
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
