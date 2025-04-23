import { IEnsureAccessTokenMiddleware } from './../../../middlewares/IEnsureAccessTokenMiddleware';
import { ITokenService } from '@domain/services/ITokenService';
import { ICheckoutPurchaseUseCase } from './ICheckoutPurchaseUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { ICheckoutPurchaseDTO } from './ICheckoutPurchaseDTO';
import {
  ICheckoutPurchaseResponse,
  PurchaseNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/Purchase/ICheckoutPurchaseHandlers';

export class ICheckoutPurchaseController {
  constructor(
    private readonly iCheckoutPurchaseUseCase: ICheckoutPurchaseUseCase,
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
      const { public_id }: ICheckoutPurchaseDTO = adapter.req
        .body as ICheckoutPurchaseDTO;
      const response:
        | ICheckoutPurchaseResponse
        | PurchaseNotFoundErrorResponse =
        await this.iCheckoutPurchaseUseCase.execute({
          public_id,
        });
      if (response instanceof PurchaseNotFoundErrorResponse) {
        return adapter.res.status(404).send({ message: 'Purchase not found' });
      }
      
      console.log(response.url);
      return adapter.res.redirect(response.url, 201);
    } catch (error) {
      return adapter.res.status(500).send({ message: error });
    }
  }
}
