import z from 'zod';
import { ITokenService } from '@domain/services/ITokenService';
import { IDetachProductFromCartUseCase } from './IDetachProductFromCartUseCase';
import { IDetachProductFromCartValidator } from '@application/validators/IDetachProductFromCartValidator';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IEnsureAccessTokenMiddleware } from '@application/middlewares/IEnsureAccessTokenMiddleware';
import { IDetachProductFromCartDTO } from './IDetachProductFromCartDTO';
import {
  IDetachProductFromCartResponse,
  InvalidAttachmentDoesNotExistsErrorResponse,
} from '@application/handlers/UseCasesResponses/Cart/IDetachProductFromCartHandlers';

export class IDetachProductFromCartController {
  constructor(
    private readonly iDetachProductFromCartUseCase: IDetachProductFromCartUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iDetachProductFromCartValidator: IDetachProductFromCartValidator
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iDetachProductFromCartValidator.validate();
    try {
      const iEnsureAccessTokenMiddlware = new IEnsureAccessTokenMiddleware(
        adapter,
        this.iTokenService
      );
      await iEnsureAccessTokenMiddlware.ensure();
      const { cart_id, product_id }: IDetachProductFromCartDTO = schema.parse(
        adapter.req.body
      );
      const response:
        | InvalidAttachmentDoesNotExistsErrorResponse
        | IDetachProductFromCartResponse =
        await this.iDetachProductFromCartUseCase.execute({
          cart_id,
          product_id,
        });

      if (response instanceof InvalidAttachmentDoesNotExistsErrorResponse) {
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
