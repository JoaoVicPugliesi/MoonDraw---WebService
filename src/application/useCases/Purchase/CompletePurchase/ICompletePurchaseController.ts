import { ZodError } from 'zod';
import { IPurchaseValidator } from '@application/validators/Request/Purchase/IPurchaseValidator';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { ICompletePurchaseUseCase } from './ICompletePurchaseUseCase';
import {
  ICompletePurchaseResponse,
  PurchaseHasNoOwnerErrorResponse,
} from './ICompletePurchaseDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import {
  MustBeABuyerErrorResponse,
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/AuthMiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ICompletePurchaseController {
  constructor(
    private readonly iCompletePurchaseUseCase: ICompletePurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iPurchaseValidator: IPurchaseValidator,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = await this.iPurchaseValidator.validateCompletePurchase();
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
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (ensure instanceof MustBeABuyerErrorResponse) {
      return adapter.res
        .status(403)
        .send({ message: 'Must verify email to access' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }

    try {
      const { purchase_id, session_id } = schema.parse(adapter.req.body);
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

      return adapter.res.status(201).send({
        message: 'Purchase Completed and Delivery Saved',
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }
      return adapter.res.status(500).send({ message: error });
    }
  }
}
