import { RequestResponseAdapter } from "@adapters/RequestResponseAdapter";
import {
  MustBeABuyerErrorResponse,
  MustBeAnArtistErrorResponse,
  MustBeAnAdminErrorResponse,
  RefreshTokenCookieMissingErrorResponse,
  TokenInvalidErrorResponse,
  TokenInvalidFormatErrorResponse,
  TokenIsMissingErrorResponse,
} from "@application/handlers/MiddlewareResponses/MiddlewareHandlers";

import { ITokenService } from "@domain/services/Token/ITokenService";
import { RefreshToken } from "@prisma/client";

export interface IEnsureAuthMiddleware {
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

  ensureUserIsABuyer(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeABuyerErrorResponse
    | TokenInvalidErrorResponse
    | void;

  ensureUserIsAnArtist(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeAnArtistErrorResponse
    | TokenInvalidErrorResponse
    | void;

  ensureUserIsAnAdmin(
    adapter: RequestResponseAdapter,
    iTokenService: ITokenService,
    secret_key: string
  ):
    | TokenIsMissingErrorResponse
    | MustBeAnAdminErrorResponse
    | TokenInvalidErrorResponse
    | void;
}
