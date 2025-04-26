import z from 'zod';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { IConfirmMailUseCase } from './IConfirmMailUseCase';
import { IConfirmMailDTO } from './IConfirmMailDTO';
import { UserNotFoundError } from '@application/handlers/UseCasesResponses/User/IConfirmMailHandlers';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { IUserValidator } from '@application/validators/User/IUserValidator';

export class IConfirmMailController {
  constructor(
    private readonly iConfirmMailUseCase: IConfirmMailUseCase,
    private readonly iUserValidator: IUserValidator,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iUserValidator.validateConfirmMail();

    try {
      const DTO: IConfirmMailDTO = schema.parse(adapter.req.body);
      const response: UserNotFoundError | void =
        await this.iConfirmMailUseCase.execute(DTO);

      if (response instanceof UserNotFoundError) {
        return adapter.res.status(404).send({ message: 'User Not Found' }); 
      }

      return adapter.res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      return adapter.res.status(500).send({ message: 'Server internal error' });
    }
  }
}
