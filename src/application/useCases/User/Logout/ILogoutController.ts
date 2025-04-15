import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ILogoutUseCase } from './ILogoutUseCase';
import { RefreshToken } from '@domain/entities/RefreshToken';
import { ILogoutDTO } from './ILogoutDTO';
import { InvalidRefreshTokenNotFoundErrorResponse } from '@application/handlers/UseCasesResponses/User/ILogoutHandlers';
import { IEnsureRefreshTokenMiddleware } from '@application/middlewares/IEnsureRefreshTokenMiddleware';

export class ILogOutController {
  constructor(
    private readonly iLogoutUseCase: ILogoutUseCase
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    try {
      const iEnsureRefreshTokenMiddleware = new IEnsureRefreshTokenMiddleware(adapter);
      const refreshToken: RefreshToken = iEnsureRefreshTokenMiddleware.ensure();
      const DTO: ILogoutDTO = {
        public_id: refreshToken.public_id,
      };
      const response: InvalidRefreshTokenNotFoundErrorResponse | void =
        await this.iLogoutUseCase.execute(DTO);

      if (response instanceof InvalidRefreshTokenNotFoundErrorResponse) {
        return adapter.res
          .status(404)
          .send({ message: 'Refresh Token Not Found' });
      }

      adapter.res.clearCookie('refresh_token');
      adapter.res.unsignCookie('refresh_token');

      return adapter.res.status(204).send();
    } catch (error) {

      return adapter.res
        .status(500)
        .send({ message: error });
      
    }
  }
}
