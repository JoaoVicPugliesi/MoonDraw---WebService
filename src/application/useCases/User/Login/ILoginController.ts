import z from 'zod';
import { ILoginUseCase } from './ILoginUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ILoginValidator } from '@application/validators/ILoginValidator';
import { ILoginDTO } from './ILoginDTO';
import {
  InvalidUserNotFoundErrorResponse,
  InvalidPasswordIsNotEqualErrorResponse,
  ILoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { InvalidGenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';

export class ILoginController {
  private readonly iLoginValidator: ILoginValidator;

  constructor(
    private readonly iLoginUseCase: ILoginUseCase
  ) {
    this.iLoginValidator = new ILoginValidator();
  }

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iLoginValidator.validate();

    try {
      const DTO: ILoginDTO = schema.parse(adapter.req.body);

      const response:
        | InvalidUserNotFoundErrorResponse
        | InvalidPasswordIsNotEqualErrorResponse
        | InvalidGenerateRefreshTokenErrorResponse
        | ILoginResponse = await this.iLoginUseCase.execute(DTO);

      if (response instanceof InvalidUserNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'User or Password incorrect' });
      if (response instanceof InvalidPasswordIsNotEqualErrorResponse)
        return adapter.res.status(401).send({ message: 'Non authorized' });
      if (response instanceof InvalidGenerateRefreshTokenErrorResponse)
        return adapter.res
          .status(501)
          .send({ message: 'Failed to generate refresh token' });
          
      adapter.res.setCookie('refresh_token', JSON.stringify(response.refresh_token), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: 'http://localhost:5173',
        maxAge: response.refresh_token.expires_in,
      });

      return adapter.res.status(200).send({
        current_user:{
          access_token: response.access_token,
          user: response.user
        },
      });
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
