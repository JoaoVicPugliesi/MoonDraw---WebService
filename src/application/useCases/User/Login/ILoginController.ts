import z from 'zod';
import { ILoginUseCase } from './ILoginUseCase';
import {
  ILoginDTO,
  ILoginResponse,
  PasswordIsNotEqualErrorResponse,
  UserNotFoundErrorResponse,
} from './ILoginDTO';
import { IUserValidator } from '@application/validators/Request/User/IUserValidator';
import { GenerateRefreshTokenErrorResponse } from '@application/useCases/RefreshToken/GenerateRefreshToken/IGenerateRefreshTokenDTO';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';

export class ILoginController {
  constructor(
    private readonly iLoginUseCase: ILoginUseCase,
    private readonly iUserValidator: IUserValidator,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware,
    
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iUserValidator.validateLogin();
    const iEnsureRateLimiting: void | LimitExceededErrorResponse =
      await this.iEnsureRateLimitingMiddleware.ensureFixedWindow(
        adapter,
        this.iRateLimiterProvider,
        5,
        60,
        60 * 2
      );

    if (iEnsureRateLimiting instanceof LimitExceededErrorResponse) {
      const number: number = iEnsureRateLimiting.accessBanTime();
      console.log(number);
      return adapter.res.status(429).send({
        message: 'Exceeded Login Rate Limit',
        retryAfter: number,
      });
    }
    try {
      const { email, password }: ILoginDTO = schema.parse(adapter.req.body);

      const response:
        | UserNotFoundErrorResponse
        | PasswordIsNotEqualErrorResponse
        | GenerateRefreshTokenErrorResponse
        | ILoginResponse = await this.iLoginUseCase.execute({
        email,
        password,
      });

      if (response instanceof UserNotFoundErrorResponse) {
        return adapter.res
          .status(404)
          .send({ message: 'User or Password incorrect' });
      }
      if (response instanceof PasswordIsNotEqualErrorResponse) {
        return adapter.res.status(401).send({ message: 'Non authorized' });
      }
      if (response instanceof GenerateRefreshTokenErrorResponse) {
        return adapter.res.status(424).send({
          message: 'Failed to generate refresh token',
        });
      }

      adapter.res.setCookie(
        'refresh_token',
        JSON.stringify(response.refresh_token),
        {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }
      );

      return adapter.res.status(200).send({
        current_user: {
          access_token: response.access_token,
          user: response.user,
        },
      });
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
