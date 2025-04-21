import z from 'zod';
import { ITokenService } from '@domain/services/ITokenService';
import { IAttachProductIntoCartUseCase } from './IAttachProductIntoCartUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { IAttachProductIntoCartDTO } from './IAttachProductIntoCartDTO';
import {
  IAttachProductIntoCartResponse,
  InvalidAttachmentAlreadyExistsErrorResponse
} from '@application/handlers/UseCasesResponses/Cart/IAttachProductIntoCart';
import { IAttachProductIntoCartValidator } from '@application/validators/IAttachProductIntoCartValidator';

export class IAttachProductIntoCartController {
  constructor(
    private readonly iAttachProductIntoCartUseCase: IAttachProductIntoCartUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iAttachProductIntoCartValidator: IAttachProductIntoCartValidator
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iAttachProductIntoCartValidator.validate();
    try {
      const iEnsureAccessTokenMiddleware = new IEnsureAccessTokenMiddleware(
        adapter,
        this.iTokenService
      );
      await iEnsureAccessTokenMiddleware.ensure();
      const { cart_id, product_id }: IAttachProductIntoCartDTO = schema.parse(
        adapter.req.body
      );

      const response:
        | InvalidAttachmentAlreadyExistsErrorResponse
        | IAttachProductIntoCartResponse =
        await this.iAttachProductIntoCartUseCase.execute({
          cart_id,
          product_id,
        });

      if (response instanceof InvalidAttachmentAlreadyExistsErrorResponse) {
        return adapter.res.status(409).send({ message: 'Product already exists inside the cart' })
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
