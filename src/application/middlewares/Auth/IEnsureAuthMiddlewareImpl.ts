import {
  TokenIsMissingErrorResponse,
  TokenInvalidErrorResponse,
  RefreshTokenCookieMissingErrorResponse,
  TokenInvalidFormatErrorResponse,
  MustBeAnAdminErrorResponse,
  MustBeAnArtistErrorResponse,
  MustBeABuyerErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IEnsureAuthMiddleware } from './IEnsureAuthMiddleware';
import { RefreshToken } from '@prisma/client';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IEnsureAuthMiddlewareImpl implements IEnsureAuthMiddleware {
  ensureTemporaryAccessToken(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ): TokenIsMissingErrorResponse | TokenInvalidErrorResponse | string {
    const temporaryAccessToken = adapter.req.headers?.authorization;

    if (!temporaryAccessToken) return new TokenIsMissingErrorResponse();
    
    const [, token] = temporaryAccessToken.split(' ');
    const tokenDecoded = iTokenService.decode(token, {
      JSON: true,
      complete: true,
    });
    const { verification_token } = tokenDecoded.payload.content;

    try {
      iTokenService.verify({
        token: token,
        secret_key: secret_key,
      });

      return verification_token;
    } catch (error) {
      return new TokenInvalidErrorResponse(error);
    }
  }

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

  ensureUserIsABuyer(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeABuyerErrorResponse
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

    if (role === 'artist' || role === 'admin') {
      return new MustBeABuyerErrorResponse();
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
  ensureUserIsAnArtist(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeAnArtistErrorResponse
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

    if (role === 'buyer' || role === 'admin') {
      return new MustBeAnArtistErrorResponse();
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

  ensureUserIsAnAdmin(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeAnAdminErrorResponse
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

    if (role === 'buyer' || role === 'artist') {
      return new MustBeAnAdminErrorResponse();
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
