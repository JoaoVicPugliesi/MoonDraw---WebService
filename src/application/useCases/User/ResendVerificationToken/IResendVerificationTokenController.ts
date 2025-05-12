import { IResendVerificationTokenUseCase } from '@application/useCases/User/ResendVerificationToken/IResendVerificationTokenUseCase';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  IResendVerificationTokenResponse,
  SessionIsExpiredErrorResponse,
} from './IResendVerificationTokenDTO';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IResendVerificationTokenController {
  constructor(
    private readonly iResendVerificationTokenUseCase: IResendVerificationTokenUseCase,
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
        message: 'Exceeded Resend Verification Token Rate Limit',
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
      const response:
        | SessionIsExpiredErrorResponse
        | IResendVerificationTokenResponse =
        await this.iResendVerificationTokenUseCase.execute({
          verification_token: iEnsureAuth,
        });

      if (response instanceof SessionIsExpiredErrorResponse) {
        return adapter.res.status(401).send({
          message: 'Session is expired.',
        });
      }
      return adapter.res.status(200).send({
        message: 'Token resended',
      });
    } catch (error) {
      return adapter.res.status(500).send({
        message: 'Server internal error',
        error: error,
      });
    }
  }
}
