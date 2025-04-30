import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshAccessTokenDTO, RefreshAccessTokenResponse, RefreshTokenNotFoundErrorResponse, RefreshTokenUserNotFoundErrorResponse } from './IRefreshAccessTokenDTO';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { RefreshTokenCookieMissingErrorResponse, TokenInvalidFormatErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
export class IRefreshAccessTokenController {
  constructor(
    private readonly iRefreshAccessTokenUseCase: IRefreshAccessTokenUseCase,
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
      }: IRefreshAccessTokenDTO = {
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
          token: {
            access_token: response.access_token,
            user: response.user,
          },
        },
      });
    } catch (error) {
      return adapter.res.status(500).send({
        message: 'Server internal error',
        error: error
      });
    }
  }
}
