import z from 'zod';
import { IConfirmMailUseCase } from './IConfirmMailUseCase';
import {
  IConfirmMailDTO,
  TokenExpiredErrorResponse,
  TokenDoesNotMatchErrorResponse,
} from './IConfirmMailDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { IUserValidator } from '@application/validators/Request/User/IUserValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IConfirmMailController {
  constructor(
    private readonly iConfirmMailUseCase: IConfirmMailUseCase,
    private readonly iUserValidator: IUserValidator,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iUserValidator.validateConfirmMail();
    const iEnsureRateLimiting: void | LimitExceededErrorResponse =
      await this.iEnsureRateLimitingMiddleware.ensureFixedWindow(
        adapter,
        this.iRateLimiterProvider,
        5,
        900,
        60 * 2
      );

    if (iEnsureRateLimiting instanceof LimitExceededErrorResponse) {
      const number: number = iEnsureRateLimiting.accessBanTime();
      return adapter.res.status(429).send({
        message: 'Exceeded Confirm Mail Rate Limit',
        retryAfter: number,
      });
    }
    const iEnsureAuth:
      | string
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse =
      this.iEnsureAuthMiddleware.ensureTemporaryAccessToken(
        adapter,
        this.iTokenService,
        process.env.JWT_TEMPORARY_KEY!
      );

    if (iEnsureAuth instanceof TokenIsMissingErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Temporary Access Token is missing' });
    }

    if (iEnsureAuth instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Temporary Access Token is invalid' });
    }

    try {
      const { verification_token }: IConfirmMailDTO = schema.parse(
        adapter.req.body
      );
      const response:
        | TokenDoesNotMatchErrorResponse
        | TokenExpiredErrorResponse
        | void = await this.iConfirmMailUseCase.execute({
        verification_token,
        ensure_verification_token: iEnsureAuth,
      });

      if (response instanceof TokenDoesNotMatchErrorResponse) {
        return adapter.res.status(401).send({
          message: 'Verification Token does not match',
        });
      }

      if (response instanceof TokenExpiredErrorResponse) {
        return adapter.res.status(401).send({
          message: 'Verification Token is expired',
        });
      }

      return adapter.res.status(201).send({
        message: 'User Saved 🚀',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      return adapter.res.status(500).send({ message: 'Server internal error' });
    }
  }
}
