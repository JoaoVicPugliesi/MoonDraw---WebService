import z from 'zod';
import { IRegisterUseCase } from './IRegisterUseCase';
import { IRegisterValidator } from '../../../validators/IRegisterValidator';
import { IRegisterDTO } from './IRegisterDTO';
import { User } from '../../../../domain/entities/User';
import { RequestResponseAdapter } from '../../../../adapters/ServerAdapter';
import { InvalidUserConflictError } from '@application/handlers/User/IRegisterHandlers';

export class IRegisterController {
  constructor(private readonly iRegisterUseCase: IRegisterUseCase) {}

  async handle(adapter: RequestResponseAdapter): Promise<void> {
    const schema = IRegisterValidator();

    try {
      const DTO: IRegisterDTO = schema.parse(adapter.req.body);
      const registered: object | User =
        await this.iRegisterUseCase.execute(DTO);

      if (registered instanceof InvalidUserConflictError) {
        return adapter.res.status(409).send({
          message: 'Conflict: user with email provided already exists',
        });
      }

      return adapter.res.status(201).send({ message: 'User created successfully', user: registered });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Error) {
        return adapter.res.status(500).send({
          message: 'Intern Server Error',
        });
      }
    }
  }
}
