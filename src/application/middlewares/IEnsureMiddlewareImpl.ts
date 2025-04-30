import {
  TokenIsMissingErrorResponse,
  TokenInvalidErrorResponse,
  RefreshTokenCookieMissingErrorResponse,
  TokenInvalidFormatErrorResponse,
  MustBeAnAdmingErrorResponse,
  MustBeVerifiedErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IEnsureMiddleware } from './IEnsureMiddleware';
import { RefreshToken } from '@prisma/client';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IEnsureMiddlewareImpl implements IEnsureMiddleware {
  ensureAccessToken(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ): TokenIsMissingErrorResponse | TokenInvalidErrorResponse | void {
    const accessToken = adapter.req.headers?.authorization;

    if (!accessToken) {
      return new TokenIsMissingErrorResponse();
    }

    const [, token] = accessToken.split(' ');

    try {
      iTokenService.verify({
        token: token,
        secret_key: secret_key,
      });
    } catch (error) {
      return new TokenInvalidErrorResponse(error);
    }
  }

  ensureRefreshToken(
    adapter: RequestResponseAdapter
  ):
    | TokenInvalidFormatErrorResponse
    | RefreshTokenCookieMissingErrorResponse
    | RefreshToken {
    const refreshTokenCookie = adapter.req.cookies.refresh_token;

    if (!refreshTokenCookie) {
      return new RefreshTokenCookieMissingErrorResponse();
    }

    try {
      const decodeCookie = decodeURIComponent(refreshTokenCookie);
      const refreshToken: RefreshToken = JSON.parse(decodeCookie);
      return refreshToken;
    } catch (error) {
      return new TokenInvalidFormatErrorResponse(error);
    }
  }

  ensureUserIsAdmin(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeAnAdmingErrorResponse
    | TokenInvalidErrorResponse
    | void {
    const accessToken = adapter.req.headers?.authorization;

    if (!accessToken) {
      return new TokenIsMissingErrorResponse();
    }

    const [, token] = accessToken.split(' ');
    const tokenDecoded = iTokenService.decode(token, {
      json: true,
      complete: true,
    });

    const { role } = tokenDecoded.payload.content;

    if (role === 'client') {
      return new MustBeAnAdmingErrorResponse();
    }
    try {
      iTokenService.verify({
        token: token,
        secret_key: secret_key,
      });
    } catch (error) {
      return new TokenInvalidErrorResponse(error);
    }
  }

  ensureUserIsVerified(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeVerifiedErrorResponse
    | TokenInvalidErrorResponse
    | void {
    const accessToken = adapter.req.headers?.authorization;

    if (!accessToken) {
      return new TokenIsMissingErrorResponse();
    }

    const [, token] = accessToken.split(' ');

    const tokenDecoded = iTokenService.decode(token, {
      json: true,
      complete: true,
    });

    const { is_verified } = tokenDecoded.payload.content;

    if (is_verified === false) {
      return new MustBeVerifiedErrorResponse();
    }

    try {
      iTokenService.verify({
        token: token,
        secret_key: secret_key,
      });
    } catch (error) {
      return new TokenInvalidErrorResponse(error);
    }
  }
}
