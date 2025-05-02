import z from 'zod';
import { IRegisterUseCase } from './IRegisterUseCase';
import { IRegisterDTO, IRegisterResponse, UserConflictErrorResponse, UserProcessingConflictErrorResponse } from './IRegisterDTO';
import { IUserValidator } from '@application/validators/Request/User/IUserValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';

export class IRegisterController {
  constructor(
    private readonly iRegisterUseCase: IRegisterUseCase,
    private readonly iUserValidator: IUserValidator
  ) {}

  async handle(adapter: RequestResponseAdapter): Promise<void> {
    const schema = this.iUserValidator.validateRegister();

    try {
      const {
        name,
        surname,
        email,
        role,
        description,
        password,
        confirmPassword
      }: IRegisterDTO = schema.parse(adapter.req.body);
      const response: 
      | UserConflictErrorResponse
      | UserProcessingConflictErrorResponse 
      | IRegisterResponse
      = await this.iRegisterUseCase.execute({
          name,
          surname,
          email,
          role,
          description,
          password,
          confirmPassword
        });

      if (response instanceof UserConflictErrorResponse) {
        return adapter.res.status(409).send({
          message: 'User already exists',
        });
      }

      if(response instanceof UserProcessingConflictErrorResponse) {
        return adapter.res.status(409).send({
          message: 'User already processing'
        });
      }
      return adapter.res.status(201).send({
        temporary_access_token: response.temporary_access_token
      });
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
