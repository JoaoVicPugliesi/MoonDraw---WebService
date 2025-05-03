import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import {
  IRefreshAccessTokenDTO,
  RefreshAccessTokenResponse,
  RefreshTokenNotFoundErrorResponse,
  RefreshTokenUserNotFoundErrorResponse,
} from './IRefreshAccessTokenDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  RefreshTokenCookieMissingErrorResponse,
  TokenInvalidFormatErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';
export class IRefreshAccessTokenController {
  constructor(
    private readonly iRefreshAccessTokenUseCase: IRefreshAccessTokenUseCase,
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
        message: 'Exceeded Refresh Access Token Rate Limit',
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
      const { public_id }: IRefreshAccessTokenDTO = {
        public_id: refreshToken.public_id,
      };
      const response:
        | RefreshTokenNotFoundErrorResponse
        | RefreshAccessTokenResponse =
        await this.iRefreshAccessTokenUseCase.execute({
          public_id,
        });

      if (response instanceof RefreshTokenNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'Refresh Token not found' });
      if (response instanceof RefreshTokenUserNotFoundErrorResponse)
        return adapter.res.status(404).send({ message: 'User not found' });

      if (response.refresh_token) {
        adapter.res.setCookie(
          'refresh_token',
          JSON.stringify(response.refresh_token),
          {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          }
        );
      }

      return adapter.res.status(200).send({
        current_user: {
          access_token: response.access_token,
          user: response.user,
        },
      });
    } catch (error) {
      return adapter.res.status(500).send({
        message: 'Server internal error',
        error: error,
      });
    }
  }
}
