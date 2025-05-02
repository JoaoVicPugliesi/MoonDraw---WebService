import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { IAttachProductIntoCartUseCase } from './IAttachProductIntoCartUseCase';
import { AttachmentAlreadyExistsErrorResponse, IAttachProductIntoCartDTO, IAttachProductIntoCartResponse } from './IAttachProductIntoCartDTO';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { ICartValidator } from '@application/validators/Request/Cart/ICartValidator';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IAttachProductIntoCartController {
  constructor(
    private readonly iAttachProductIntoCartUseCase: IAttachProductIntoCartUseCase,
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
      return adapter.res.status(401).send({ message: 'Access Token is missing' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Access Token is invalid' });
    }
    try {
      const { cart_id, product_id }: IAttachProductIntoCartDTO = schema.parse(
        adapter.req.body
      );

      const response:
        | AttachmentAlreadyExistsErrorResponse
        | IAttachProductIntoCartResponse =
        await this.iAttachProductIntoCartUseCase.execute({
          cart_id,
          product_id,
        });

      if (response instanceof AttachmentAlreadyExistsErrorResponse) {
        return adapter.res
          .status(409)
          .send({ message: 'Product already exists inside the cart' });
      }

      return adapter.res.status(201).send({
        message: 'Product Added',
      });
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
