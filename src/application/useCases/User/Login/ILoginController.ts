import z from 'zod';
import { ILoginUseCase } from './ILoginUseCase';
import { RequestResponseAdapter } from '@adapters/ServerAdapter';
import { ILoginDTO } from './ILoginDTO';
import {
  UserNotFoundErrorResponse,
  PasswordIsNotEqualErrorResponse,
  ILoginResponse,
} from '@application/handlers/UseCasesResponses/User/ILoginHandlers';
import { GenerateRefreshTokenErrorResponse } from '@application/handlers/UseCasesResponses/RefreshToken/IGenerateRefreshTokenHandler';
import { IUserValidator } from '@application/validators/User/IUserValidator';

export class ILoginController {
  constructor(
    private readonly iLoginUseCase: ILoginUseCase,
    private readonly iUserValidator: IUserValidator
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iUserValidator.validateLogin();

    try {
      const DTO: ILoginDTO = schema.parse(adapter.req.body);

      const response:
        | UserNotFoundErrorResponse
        | PasswordIsNotEqualErrorResponse
        | GenerateRefreshTokenErrorResponse
        | ILoginResponse = await this.iLoginUseCase.execute(DTO);

      if (response instanceof UserNotFoundErrorResponse)
        return adapter.res
          .status(404)
          .send({ message: 'User or Password incorrect' });
      if (response instanceof PasswordIsNotEqualErrorResponse)
        return adapter.res.status(401).send({ message: 'Non authorized' });
      if (response instanceof GenerateRefreshTokenErrorResponse)
        return adapter.res
          .status(501)
          .send({ message: 'Failed to generate refresh token' });
          
      adapter.res.setCookie('refresh_token', JSON.stringify(response.refresh_token), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '*',
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
