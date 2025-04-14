import z from 'zod';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IConfirmMailUseCase } from './IConfirmMailUseCase';
import { IConfirmMailDTO } from './IConfirmMailDTO';
import { IConfirmMailValidator } from '@application/validators/IConfirmMailValidator';
import { InvalidUserNotFoundError } from '@application/handlers/UseCasesResponses/User/IConfirmMailHandlers';

export class IConfirmMailController {

  private readonly iConfirmMailValidator: IConfirmMailValidator;

  constructor(
    private readonly iConfirmMailUseCase: IConfirmMailUseCase
  ) {
    this.iConfirmMailValidator = new IConfirmMailValidator();
  }

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iConfirmMailValidator.validate();

    try {
      const DTO: IConfirmMailDTO = schema.parse(adapter.req.body);
      const response: InvalidUserNotFoundError | void = await this.iConfirmMailUseCase.execute(
        DTO
      );

      if (response instanceof InvalidUserNotFoundError)
        return adapter.res.status(404).send({ message: 'User Not Found' });

      return adapter.res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      return adapter.res
        .status(500)
        .send({ message: 'Server internal error' });
    }
  }
}
