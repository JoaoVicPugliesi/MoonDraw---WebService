import z from 'zod';
import { IRegisterUseCase } from './IRegisterUseCase';
import { IRegisterValidator } from '@application/validators/IRegisterValidator';
import { IRegisterDTO } from './IRegisterDTO';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import {
  InvalidUserConflictErrorResponse,
  RegisterReponse,
} from '@application/handlers/UseCasesResponses/User/IRegisterHandlers';
import {
  InvalidPasswordIsNotEqualErrorResponse,
  InvalidUserNotFoundErrorResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';

export class IRegisterController {
  private readonly iRegisterValidator: IRegisterValidator;

  constructor(
    private readonly iRegisterUseCase: IRegisterUseCase
  ) {
    this.iRegisterValidator = new IRegisterValidator();
  }

  async handle(adapter: RequestResponseAdapter): Promise<void> {
    const schema = this.iRegisterValidator.validate();

    try {
      const DTO: IRegisterDTO = schema.parse(adapter.req.body);
      const response: InvalidUserConflictErrorResponse | RegisterReponse =
        await this.iRegisterUseCase.execute(DTO);

      if (response instanceof InvalidUserConflictErrorResponse) {
        return adapter.res.status(409).send({
          message: 'Conflict: user with email provided already exists',
        });
      }
      if (response.login_response instanceof InvalidUserNotFoundErrorResponse) {
        return adapter.res.status(404).send({ message: 'User or Password incorrect' });
      }
      if (response.login_response instanceof InvalidPasswordIsNotEqualErrorResponse) {
        return adapter.res.status(401).send({ message: 'Non authorized' });
      }
      if (response.login_response instanceof InvalidGenerateRefreshTokenErrorResponse) {
        return adapter.res.status(501).send({ message: 'Failed to generate refresh token' });
      }
      
      adapter.res.setCookie('refresh_token', JSON.stringify(response.login_response.refresh_token), {
        httpOnly: true, 
        secure: true,  
        sameSite: 'strict', 
        path: '/',        
        maxAge: response.login_response.refresh_token.expires_in, 
      });

      return adapter.res.status(201).send({ 
        message: 'User created successfully', 
        current_user: {
          access_token: response.login_response.access_token,
          user: response.login_response.user
        }
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
