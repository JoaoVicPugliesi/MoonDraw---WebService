import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ILogoutUseCase } from './ILogoutUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { ILogoutDTO } from './ILogoutDTO';
import { InvalidRefreshTokenNotFoundErrorResponse } from '@application/handlers/UseCasesResponses/User/ILogoutHandlers';

export class ILogOutController {
  constructor(private readonly iLogoutUseCase: ILogoutUseCase) {}

  async handle(adapter: RequestResponseAdapter, refreshToken: RefreshToken) {
    try {
      const DTO: ILogoutDTO = {
        public_id: refreshToken.public_id,
      };
      const loggedOut: InvalidRefreshTokenNotFoundErrorResponse | void =
        await this.iLogoutUseCase.execute(DTO);

      if (loggedOut instanceof InvalidRefreshTokenNotFoundErrorResponse) {
        return adapter.res
          .status(404)
          .send({ message: 'Refresh Token Not Found' });
      }

      adapter.res.clearCookie('refresh_token');

      return adapter.res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return adapter.res
          .status(500)
          .send({ message: 'Server internal error' });
      }
    }
  }
}
