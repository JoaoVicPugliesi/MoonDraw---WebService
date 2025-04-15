import z from 'zod';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { InvalidRefreshTokenNotFoundErrorResponse, InvalidRefreshTokenUserNotFoundErrorResponse, RefreshAccessTokenResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IRefreshAccessTokenHandler';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
import { IEnsureRefreshTokenMiddleware } from '@application/middlewares/IEnsureRefreshTokenMiddleware';
export class IRefreshAccessTokenController {
  constructor(
    private readonly iRefreshAccessTokenUseCase: IRefreshAccessTokenUseCase
  ) {}

  async handle(adapter: RequestResponseAdapter) {

    try {
      const iEnsureRefreshTokenMiddleware = new IEnsureRefreshTokenMiddleware(adapter);
      const refreshToken: RefreshToken = iEnsureRefreshTokenMiddleware.ensure();
      const DTO: IRefreshAccessTokenDTO = {
        public_id: refreshToken.public_id
      }
      const response: InvalidRefreshTokenNotFoundErrorResponse | RefreshAccessTokenResponse =
      await this.iRefreshAccessTokenUseCase.execute(DTO);

      if (response instanceof InvalidRefreshTokenNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'Refresh Token not found' });
      if (response instanceof InvalidRefreshTokenUserNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'User not found' });

      if(response.refresh_token) {
        adapter.res.setCookie('refresh_token', JSON.stringify(response.refresh_token), {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: response.refresh_token?.expires_in
        });
      }

      return adapter.res.status(200).send({ 
        current_user: {
          token: {
            access_token: response.access_token,
            user: response.user
          }
        } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      return adapter.res
        .status(500)
        .send({ message: 'Server internal error' });
    }
  }
}
