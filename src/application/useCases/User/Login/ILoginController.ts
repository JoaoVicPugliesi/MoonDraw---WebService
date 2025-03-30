import z from 'zod';
import { ILoginUseCase } from './ILoginUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ILoginValidator } from '@application/validators/ILoginValidator';
import { ILoginDTO } from './ILoginDTO';
import {
  InvalidUserNotFoundError,
  InvalidPasswordIsNotEqualError
} from '@application/handlers/User/ILoginHandlers';
import { InvalidGenerateRefreshToken } from '@application/handlers/RefreshToken/IGenerateRefreshTokenHandler';

export class ILoginController {

  private readonly iLoginValidator: ILoginValidator;

  constructor(private readonly iLoginUseCase: ILoginUseCase) {
    this.iLoginValidator = new ILoginValidator();
  }

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iLoginValidator.validate();

    try {
      const DTO: ILoginDTO = schema.parse(adapter.req.body);

      const logged: InvalidUserNotFoundError | InvalidPasswordIsNotEqualError | object = await this.iLoginUseCase.execute(DTO);

      if (logged instanceof InvalidUserNotFoundError)
        return adapter.res.status(404).send({ message: 'User or Password incorrect' });
      if (logged instanceof InvalidPasswordIsNotEqualError)
        return adapter.res.status(401).send({ message: 'Non authorized' });
      if (logged instanceof InvalidGenerateRefreshToken)
        return adapter.res.status(501).send({ message: 'Failed to generate refresh token' });

      return adapter.res.status(200).send({ current_user: logged });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return adapter.res.status(422).send({
          message: 'Validation Error',
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Error) {
        return adapter.res
          .status(500)
          .send({ message: 'Server internal error' });
      }
    }
  }
}
