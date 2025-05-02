import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IInitiatePurchaseUseCase } from './IInitiatePurchaseUseCase';
import { IInitiatePurchaseDTO } from './IInitiatePurchaseDTO';
import {
  MustBeABuyerErrorResponse,
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { IPurchaseValidator } from '@application/validators/Request/Purchase/IPurchaseValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IInitiatePurchaseController {
  constructor(
    private readonly iInitiatePurchaseUseCase: IInitiatePurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iPurchaseValidator: IPurchaseValidator,
    private readonly iEnsureMiddleware: IEnsureMiddleware,
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iPurchaseValidator.validateInitiatePurchase();
    const ensure:
    | void
    | TokenIsMissingErrorResponse
    | MustBeABuyerErrorResponse
    | TokenInvalidErrorResponse = this.iEnsureMiddleware.ensureUserIsABuyer(
        adapter,
        this.iTokenService,
        process.env.JWT_SECRET_KEY!
      );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is missing' });
    }
    if(ensure instanceof MustBeABuyerErrorResponse) {
      return adapter.res.status(403).send({ message: 'Must verify email to access' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is invalid' });
    }
    try {
      const { buyer_id, title, selected_products }: IInitiatePurchaseDTO = schema.parse(
        adapter.req.body
      );
      await this.iInitiatePurchaseUseCase.execute({
        buyer_id,
        title,
        selected_products,
      });

      return adapter.res
        .status(201)
        .send({ message: 'Purchase initialized successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }
      return adapter.res.status(500).send({ message: error });
    }
  }
}
