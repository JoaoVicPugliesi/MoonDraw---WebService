import { ILogoutUseCase } from './ILogoutUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { ILogoutDTO, RefreshTokenNotFoundErrorResponse } from './ILogoutDTO';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { RefreshTokenCookieMissingErrorResponse, TokenInvalidFormatErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ILogOutController {
  constructor(
    private readonly iLogoutUseCase: ILogoutUseCase,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const refreshToken:
      | TokenInvalidFormatErrorResponse
      | RefreshTokenCookieMissingErrorResponse
      | RefreshToken = this.iEnsureMiddleware.ensureRefreshToken(
        adapter
      );

    if (refreshToken instanceof RefreshTokenCookieMissingErrorResponse) {
      return adapter.res.status(401).send({
        message: 'Unauthorized',
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
