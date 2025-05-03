import { ILogoutUseCase } from './ILogoutUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { ILogoutDTO, RefreshTokenNotFoundErrorResponse } from './ILogoutDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { RefreshTokenCookieMissingErrorResponse, TokenInvalidFormatErrorResponse } from '@application/handlers/MiddlewareResponses/AuthMiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ILogOutController {
  constructor(
    private readonly iLogoutUseCase: ILogoutUseCase,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const refreshToken:
      | TokenInvalidFormatErrorResponse
      | RefreshTokenCookieMissingErrorResponse
      | RefreshToken = this.iEnsureAuthMiddleware.ensureRefreshToken(
        adapter
      );

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
      const { 
        public_id 
      }: ILogoutDTO = {
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
        path: '/'
      });

      return adapter.res.status(204).send();
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
