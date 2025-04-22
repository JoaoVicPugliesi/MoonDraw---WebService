import { ITokenService } from '@domain/services/ITokenService';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';

export class IEnsureAccessTokenMiddleware {
  private readonly secret_key: string;

  constructor(
    private readonly adapter: RequestResponseAdapter,
    private readonly iTokenService: ITokenService
  ) {
    this.secret_key = process.env.SECRET_KEY as string;
  }

  ensure(): TokenIsMissingErrorResponse | TokenInvalidErrorResponse | void {
    const accessToken = this.adapter.req.headers?.authorization;

    if (!accessToken) {
      return new TokenIsMissingErrorResponse();
    }

    const [, token] = accessToken.split(' ');

    try {
      this.iTokenService.verify({
        token: token,
        secret_key: this.secret_key,
      });
    } catch (error) {
      return new TokenInvalidErrorResponse(error);
    }
  }
}
