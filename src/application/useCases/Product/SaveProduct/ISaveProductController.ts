import z from 'zod';
import { ITokenService } from '@domain/services/Token/ITokenService';
import { ISaveProductUseCase } from './ISaveProductUseCase';
import { ISaveProductDTO, ProductAlreadyExistsErrorResponse } from './ISaveProductDTO';

import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { IProductValidator } from '@application/validators/Request/Product/IProductValidator';
import { MustBeAnAdmingErrorResponse, TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class ISaveProductController {
  constructor(
    private readonly iSaveProductUseCase: ISaveProductUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iProductValidator: IProductValidator,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iProductValidator.validateSaveProduct();

    const ensure:
      | void
      | TokenIsMissingErrorResponse
      | MustBeAnAdmingErrorResponse
      | TokenInvalidErrorResponse = this.iEnsureMiddleware.ensureUserIsAdmin(
      adapter,
      this.iTokenService,
      process.env.JWT_SECRET_KEY!
    );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is missing' });
    }
    if (ensure instanceof MustBeAnAdmingErrorResponse) {
      return adapter.res
        .status(403)
        .send({ message: 'Only admins have access' });
    }
    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Token is invalid' });
    }

    try {
      const {
        image_id,
        name,
        description,
        price,
        supply,
        publisher,
      }: ISaveProductDTO = schema.parse(adapter.req.body);
      const response: ProductAlreadyExistsErrorResponse | void =
        await this.iSaveProductUseCase.execute({
          image_id,
          name,
          description,
          price,
          supply,
          publisher,
        });
      if (response instanceof ProductAlreadyExistsErrorResponse) {
        return adapter.res
          .status(409)
          .send({ message: 'Product needs to have a unique name' });
      }

      return adapter.res
        .status(201)
        .send({ message: 'Product created successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      return adapter.res.status(500).send({
        message: 'Intern Server Error',
      });
    }
  }
}
