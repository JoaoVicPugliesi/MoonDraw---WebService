import { IRemovePurchaseUseCase } from './IRemovePurchaseUseCase';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/AuthMiddlewareHandlers';
import { IRemovePurchaseDTO } from './IRemovePurchaseDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IRemovePurchaseController {
  constructor(
    private readonly iRemovePurchaseUseCase: IRemovePurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | void
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse = this.iEnsureAuthMiddleware.ensureAccessToken(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
    );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is invalid' });
    }

    try {
      const { 
        public_id 
      }: IRemovePurchaseDTO = adapter.req
        .body as IRemovePurchaseDTO;

      await this.iRemovePurchaseUseCase.execute({
        public_id,
      });

      return adapter.res.status(204).send();
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
