import z from 'zod';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { InvalidRefreshTokenNotFoundErrorResponse, InvalidRefreshTokenUserNotFoundErrorResponse, RefreshAccessTokenResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IRefreshAccessTokenHandler';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
export class IRefreshAccessTokenController {
  constructor(
    private readonly iRefreshAccessTokenUseCase: IRefreshAccessTokenUseCase
  ) {}

  async handle(adapter: RequestResponseAdapter, refreshToken: RefreshToken) {

    try {
      const DTO: IRefreshAccessTokenDTO = {
        public_id: refreshToken.public_id
      }
      const refreshed: InvalidRefreshTokenNotFoundErrorResponse | RefreshAccessTokenResponse =
      await this.iRefreshAccessTokenUseCase.execute(DTO);

      if (refreshed instanceof InvalidRefreshTokenNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'Refresh Token not found' });
      if (refreshed instanceof InvalidRefreshTokenUserNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'User not found' });

      if(refreshed.refresh_token) {
        adapter.res.setCookie('refresh_token', JSON.stringify(refreshed.refresh_token), {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: refreshed.refresh_token?.expires_in
        });
      }

      return adapter.res.status(200).send({ 
        current_user: {
          token: {
            access_token: refreshed.access_token
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

      if (error instanceof Error) {
        return adapter.res
          .status(500)
          .send({ message: 'Server internal error' });
      }
    }
  }
}
