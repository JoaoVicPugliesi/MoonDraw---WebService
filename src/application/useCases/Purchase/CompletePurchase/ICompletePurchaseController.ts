import { ITokenService } from '@domain/services/ITokenService';
import { ICompletePurchaseUseCase } from './ICompletePurchaseUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { ICompletePurchaseDTO } from './ICompletePurchaseDTO';
import {
  ICompletePurchaseResponse,
  PurchaseHasNoOwnerErrorResponse,
} from '@application/handlers/UseCasesResponses/Purchase/ICompletePurchaseHandlers';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';

export class ICompletePurchaseController {
  constructor(
    private readonly iCompletePurchaseUseCase: ICompletePurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddleware: IEnsureMiddleware,
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
    | void
    | TokenIsMissingErrorResponse
    | TokenInvalidErrorResponse = this.iEnsureMiddleware.ensureAccessToken(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
      );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }

    try {
      const { purchase_id, session_id } = adapter.req
        .body as ICompletePurchaseDTO;
      const response:
        | PurchaseHasNoOwnerErrorResponse
        | ICompletePurchaseResponse =
        await this.iCompletePurchaseUseCase.execute({
          purchase_id,
          session_id,
        });

      if (response instanceof PurchaseHasNoOwnerErrorResponse) {
        return adapter.res
          .status(400)
          .send({ message: 'Purchase owner does not exist' });
      }

      return adapter.res
        .status(201)
        .send({
          message: 'Purchase Complete and Delivery Registed',
          delivery: response.delivery,
        });
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
