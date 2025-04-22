import { ITokenService } from '@domain/services/ITokenService';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import {
  MustBeAnAdmingErrorResponse,
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';

export class IEnsureUserIsAdminMiddleware {
  private readonly secret_key: string;

  constructor(
    private readonly adapter: RequestResponseAdapter,
    private readonly iTokenService: ITokenService
  ) {
    this.secret_key = process.env.SECRET_KEY as string;
  }

  ensure():
    | TokenIsMissingErrorResponse
    | MustBeAnAdmingErrorResponse
    | TokenInvalidErrorResponse
    | void {
    const accessToken = this.adapter.req.headers?.authorization;

    if (!accessToken) {
      return new TokenIsMissingErrorResponse();
    }

    const [, token] = accessToken.split(' ');
    const tokenDecoded = this.iTokenService.decode(token, {
      json: true,
      complete: true,
    });

    const { role } = tokenDecoded.payload.content;

    if (role === 'client') {
      return new MustBeAnAdmingErrorResponse();
    }
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
