import { ITokenService } from '@domain/services/Token/ITokenService';
import { ICheckoutPurchaseUseCase } from './ICheckoutPurchaseUseCase';
import {
  ICheckoutPurchaseDTO,
  ICheckoutPurchaseResponse,
  PurchaseNotFoundErrorResponse,
} from './ICheckoutPurchaseDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  MustBeABuyerErrorResponse,
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/AuthMiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ICheckoutPurchaseController {
  constructor(
    private readonly iCheckoutPurchaseUseCase: ICheckoutPurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | void
      | TokenIsMissingErrorResponse
      | MustBeABuyerErrorResponse
      | TokenInvalidErrorResponse =
      this.iEnsureAuthMiddleware.ensureUserIsABuyer(
        adapter,
        this.iTokenService,
        process.env.JWT_SECRET_KEY!
      );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is missing' });
    }
    if (ensure instanceof MustBeABuyerErrorResponse) {
      return adapter.res
        .status(403)
        .send({ message: 'Must be verified to access' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Access Token is invalid' });
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
