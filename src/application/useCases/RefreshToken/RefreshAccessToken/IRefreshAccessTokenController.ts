import z from 'zod';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IRefreshAccessTokenUseCase } from './IRefreshAccessTokenUseCase';
import { IRefreshAccessTokenDTO } from './IRefreshAccessTokenDTO';
import { InvalidRefreshTokenNotFoundErrorResponse, InvalidRefreshTokenUserNotFoundErrorResponse, RefreshAccessTokenResponse } from '@application/handlers/UseCasesReponses/RefreshToken/IRefreshAccessTokenHandler';
import { RefreshToken } from '@domain/entities/RefreshToken';
export class IRefreshAccessTokenController {
  constructor(
    private readonly iRefreshAccessTokenUseCase: IRefreshAccessTokenUseCase
  ) {}

  async handle(adapter: RequestResponseAdapter, refreshToken: RefreshToken) {
    const schema = z.object({
      public_id: z.string({
        required_error: 'public_id is required',
        invalid_type_error: 'public_id should be a string',
      }),
    });

    try {
      const DTO: IRefreshAccessTokenDTO = schema.parse(refreshToken.public_id);
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
        adapter.res.clearCookie('refresh_token');
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
          token: refreshed.access_token
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
