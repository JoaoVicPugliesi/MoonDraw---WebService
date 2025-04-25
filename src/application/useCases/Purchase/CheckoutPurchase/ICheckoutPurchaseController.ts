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
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';

export class ICheckoutPurchaseController {
  constructor(
    private readonly iCheckoutPurchaseUseCase: ICheckoutPurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddleware: IEnsureMiddleware
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
