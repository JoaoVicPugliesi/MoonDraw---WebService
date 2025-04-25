import z from 'zod';
import { ITokenService } from '@domain/services/ITokenService';
import { IInitiatePurchaseUseCase } from './IInitiatePurchaseUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IInitiatePurchaseValidator } from '@application/validators/IInitiatePurchaseValidator';
import { IInitiatePurchaseDTO } from './IInitiatePurchaseDTO';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';

export class IInitiatePurchaseController {
  constructor(
    private readonly iInitiatePurchaseUseCase: IInitiatePurchaseUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iInitiatePurchaseValidator: IInitiatePurchaseValidator,
    private readonly iEnsureMiddleware: IEnsureMiddleware,
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iInitiatePurchaseValidator.validate();
    const ensure:
    | void
    | TokenIsMissingErrorResponse
    | TokenInvalidErrorResponse = this.iEnsureMiddleware.ensureUserIsVerified(
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
      const { user_id, title, selected_products }: IInitiatePurchaseDTO = schema.parse(
        adapter.req.body
      );
      await this.iInitiatePurchaseUseCase.execute({
        user_id,
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
