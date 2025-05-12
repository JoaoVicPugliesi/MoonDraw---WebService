import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IDetachProductFromCartUseCase } from './IDetachProductFromCartUseCase';
import {
  AttachmentDoesNotExistsErrorResponse,
  IDetachProductFromCartDTO,
  IDetachProductFromCartResponse,
} from './IDetachProductFromCartDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { ICartValidator } from '@application/validators/Request/Cart/ICartValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';

export class IDetachProductFromCartController {
  constructor(
    private readonly iDetachProductFromCartUseCase: IDetachProductFromCartUseCase,
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
        message: 'Exceeded Detach Product From Cart Rate Limit',
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
      const { cart_id, product_id }: IDetachProductFromCartDTO = schema.parse(
        adapter.req.body
      );
      const response: IDetachProductFromCartResponse =
        await this.iDetachProductFromCartUseCase.execute({
          cart_id,
          product_id,
        });

      if (response instanceof AttachmentDoesNotExistsErrorResponse) {
        return adapter.res
          .status(404)
          .send({ message: 'Attachment does not exist' });
      }

      return adapter.res.status(204).send();
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
