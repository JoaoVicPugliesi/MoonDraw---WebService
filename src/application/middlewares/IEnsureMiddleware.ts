import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import {
  MustBeAnAdmingErrorResponse,
  MustBeVerifiedErrorResponse,
  RefreshTokenCookieMissingErrorResponse,
  TokenInvalidErrorResponse,
  TokenInvalidFormatErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';

import { ITokenService } from '@domain/services/Token/ITokenService';
import { RefreshToken } from '@prisma/client';

export interface IEnsureMiddleware {

  ensureTemporaryAccessToken(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ): TokenIsMissingErrorResponse | TokenInvalidErrorResponse | string;

  ensureAccessToken(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ): TokenIsMissingErrorResponse | TokenInvalidErrorResponse | void;

  ensureRefreshToken(
    adapter: RequestResponseAdapter
  ):
    | TokenInvalidFormatErrorResponse
    | RefreshTokenCookieMissingErrorResponse
    | RefreshToken;

  ensureUserIsAdmin(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeAnAdmingErrorResponse
    | TokenInvalidErrorResponse
    | void;

  ensureUserIsVerified(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeVerifiedErrorResponse
    | TokenInvalidErrorResponse
    | void;
}
