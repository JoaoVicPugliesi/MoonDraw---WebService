import z from 'zod';
import { ILoginUseCase } from './ILoginUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ILoginValidator } from '@application/validators/ILoginValidator';
import { ILoginDTO } from './ILoginDTO';
import {
  InvalidUserNotFoundErrorResponse,
  InvalidPasswordIsNotEqualErrorResponse,
  LoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';

export class ILoginController {
  private readonly iLoginValidator: ILoginValidator;

  constructor(private readonly iLoginUseCase: ILoginUseCase) {
    this.iLoginValidator = new ILoginValidator();
  }

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iLoginValidator.validate();

    try {
      const DTO: ILoginDTO = schema.parse(adapter.req.body);

      const logged:
        | InvalidUserNotFoundErrorResponse
        | InvalidPasswordIsNotEqualErrorResponse
        | InvalidGenerateRefreshTokenErrorResponse
        | LoginResponse = await this.iLoginUseCase.execute(DTO);

      if (logged instanceof InvalidUserNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'User or Password incorrect' });
      if (logged instanceof InvalidPasswordIsNotEqualErrorResponse)
        return adapter.res.status(401).send({ message: 'Non authorized' });
      if (logged instanceof InvalidGenerateRefreshTokenErrorResponse)
        return adapter.res
          .status(501)
          .send({ message: 'Failed to generate refresh token' });
          
      adapter.res.setCookie('refresh_token', JSON.stringify(logged.refresh_token), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: 'http://localhost:5173',
        maxAge: logged.refresh_token.expires_in,
      });

      return adapter.res.status(200).send({
        current_user:{
          access_token: logged.access_token,
          user: logged.user
        },
      });
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
