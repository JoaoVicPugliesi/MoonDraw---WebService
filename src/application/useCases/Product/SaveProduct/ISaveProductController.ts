import z from 'zod';
import { ISaveProductValidator } from '@application/validators/ISaveProductValidator';
import { ITokenService } from '@domain/services/ITokenService';
import { IEnsureUserIsAdminMiddleware } from '@application/middlewares/IEnsureUserIsAdminMiddleware';
import { ISaveProductUseCase } from './ISaveProductUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ISaveProductDTO } from './ISaveProductDTO';
import { InvalidProductAlreadyExistsErrorResponse } from '@application/handlers/UseCasesResponses/Product/ISaveProductHandlers';

export class ISaveProductController {
  constructor(
    private readonly iSaveProductUseCase: ISaveProductUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iSaveProductValidator: ISaveProductValidator
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iSaveProductValidator.validate();

    try {
      const iEnsureUserIsAdminMiddleware = new IEnsureUserIsAdminMiddleware(
        adapter,
        this.iTokenService
      );
      const ensure = await iEnsureUserIsAdminMiddleware.ensure();

      if(ensure instanceof Error) {
        return adapter.res.status(401).send({ message: 'Only admins have access' });
      }
      const {
        image_id,
        name,
        description,
        price,
        supply,
        publisher,
      }: ISaveProductDTO = schema.parse(adapter.req.body);
      const response: InvalidProductAlreadyExistsErrorResponse | void =
        await this.iSaveProductUseCase.execute({
          image_id,
          name,
          description,
          price,
          supply,
          publisher,
        });
      if (response instanceof InvalidProductAlreadyExistsErrorResponse) {
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
