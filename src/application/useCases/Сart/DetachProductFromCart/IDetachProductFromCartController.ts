import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IDetachProductFromCartUseCase } from './IDetachProductFromCartUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IDetachProductFromCartDTO } from './IDetachProductFromCartDTO';
import {
  IDetachProductFromCartResponse,
  AttachmentDoesNotExistsErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IDetachProductFromCartHandlers';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { ICartValidator } from '@application/validators/Cart/ICartValidator';

export class IDetachProductFromCartController {
  constructor(
    private readonly iDetachProductFromCartUseCase: IDetachProductFromCartUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iCartValidator: ICartValidator,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iCartValidator.validateAttachmentBetweenProductAndCart();
    const ensure:
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse
      | void = this.iEnsureMiddleware.ensureAccessToken(
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
      const { cart_id, product_id }: IDetachProductFromCartDTO = schema.parse(
        adapter.req.body
      );
      const response:
        | AttachmentDoesNotExistsErrorResponse
        | IDetachProductFromCartResponse =
        await this.iDetachProductFromCartUseCase.execute({
          cart_id,
          product_id,
        });

      if (response instanceof AttachmentDoesNotExistsErrorResponse) {
        return adapter.res
          .status(404)
          .send({ message: 'Attachment does not exist' });
      }

      return adapter.res.status(204).send();
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
