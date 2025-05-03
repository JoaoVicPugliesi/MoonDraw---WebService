import { ILogoutUseCase } from './ILogoutUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { ILogoutDTO, RefreshTokenNotFoundErrorResponse } from './ILogoutDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  RefreshTokenCookieMissingErrorResponse,
  TokenInvalidFormatErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class ILogOutController {
  constructor(
    private readonly iLogoutUseCase: ILogoutUseCase,
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
        message: 'Exceeded Logout Rate Limit',
        retryAfter: number,
      });
    }
    const refreshToken:
      | TokenInvalidFormatErrorResponse
      | RefreshTokenCookieMissingErrorResponse
      | RefreshToken = this.iEnsureAuthMiddleware.ensureRefreshToken(adapter);

    if (refreshToken instanceof RefreshTokenCookieMissingErrorResponse) {
      return adapter.res.status(401).send({
        message: 'Refresh Token is missing',
      });
    }
    if (refreshToken instanceof TokenInvalidFormatErrorResponse) {
      return adapter.res.status(400).send({
        message: 'Invalid token format',
      });
    }
    try {
      const { public_id }: ILogoutDTO = {
        public_id: refreshToken.public_id,
      };
      const response: RefreshTokenNotFoundErrorResponse | void =
        await this.iLogoutUseCase.execute({
          public_id,
        });

      if (response instanceof RefreshTokenNotFoundErrorResponse) {
        return adapter.res
          .status(404)
          .send({ message: 'Refresh Token Not Found' });
      }

      adapter.res.clearCookie('refresh_token', {
        path: '/',
      });

      return adapter.res.status(204).send();
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
