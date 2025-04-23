import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { IRemovePurchaseUseCase } from './IRemovePurchaseUseCase';
import { ITokenService } from '@domain/services/ITokenService';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IRemovePurchaseDTO } from './IRemovePurchaseDTO';

export class IRemovePurchaseController {
  constructor(
    private readonly iRemovePurchaseUseCase: IRemovePurchaseUseCase,
    private readonly iTokenService: ITokenService
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const iEnsureAccessTokenMiddlware = new IEnsureAccessTokenMiddleware(
      adapter,
      this.iTokenService
    );
    const ensure:
      | void
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse = iEnsureAccessTokenMiddlware.ensure();

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }

    try {
      const { public_id }: IRemovePurchaseDTO = adapter.req
        .query as IRemovePurchaseDTO;

      await this.iRemovePurchaseUseCase.execute({
        public_id,
      });

      return adapter.res.status(204).send();
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
