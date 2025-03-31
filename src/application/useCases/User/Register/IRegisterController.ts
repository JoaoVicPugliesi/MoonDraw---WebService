import z from 'zod';
import { IRegisterUseCase } from './IRegisterUseCase';
import { IRegisterValidator } from '@application/validators/IRegisterValidator';
import { IRegisterDTO } from './IRegisterDTO';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import {
  InvalidUserConflictError,
  RegisterReponse,
} from '@application/handlers/User/IRegisterHandlers';
import {
  InvalidPasswordIsNotEqualError,
  InvalidUserNotFoundError,
} from '@application/handlers/User/ILoginHandlers';
import { InvalidGenerateRefreshToken } from '@application/handlers/RefreshToken/IGenerateRefreshTokenHandler';

export class IRegisterController {
  private readonly iRegisterValidator: IRegisterValidator;

  constructor(private readonly iRegisterUseCase: IRegisterUseCase) {
    this.iRegisterValidator = new IRegisterValidator();
  }

  async handle(adapter: RequestResponseAdapter): Promise<void> {
    const schema = this.iRegisterValidator.validate();

    try {
      const DTO: IRegisterDTO = schema.parse(adapter.req.body);
      const registered: InvalidUserConflictError | RegisterReponse =
        await this.iRegisterUseCase.execute(DTO);

      if (registered instanceof InvalidUserConflictError) {
        return adapter.res.status(409).send({
          message: 'Conflict: user with email provided already exists',
        });
      }
      if (registered.login_response instanceof InvalidUserNotFoundError) {
        return adapter.res.status(404).send({ message: 'User or Password incorrect' });
      }
      if (registered.login_response instanceof InvalidPasswordIsNotEqualError) {
        return adapter.res.status(401).send({ message: 'Non authorized' });
      }
      if (registered.login_response instanceof InvalidGenerateRefreshToken) {
        return adapter.res.status(501).send({ message: 'Failed to generate refresh token' });
      }

      adapter.res.setCookie('refreshToken', registered.login_response.refresh_token.public_id, {
        httpOnly: true, 
        secure: true,  
        sameSite: 'strict', 
        path: '/',        
        maxAge: registered.login_response.refresh_token.expires_in, 
      });

      return adapter.res.status(201).send({ message: 'User created successfully', current_user: registered.login_response.access_token });
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
