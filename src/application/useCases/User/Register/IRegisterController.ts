import z from 'zod';
import { IRegisterUseCase } from './IRegisterUseCase';
import {
  IRegisterDTO,
  IRegisterResponse,
  UserConflictErrorResponse,
  UserProcessingConflictErrorResponse,
} from './IRegisterDTO';
import { IUserValidator } from '@application/validators/Request/User/IUserValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { IEnsureRateLimitingMiddleware } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddleware';
import { IRateLimiterProvider } from '@domain/providers/RateLimiter/IRateLimiterProvider';
import { LimitExceededErrorResponse } from '@application/handlers/MiddlewareResponses/RateLimitingMiddlwareHandlers';

export class IRegisterController {
  constructor(
    private readonly iRegisterUseCase: IRegisterUseCase,
    private readonly iUserValidator: IUserValidator,
    private readonly iRateLimiterProvider: IRateLimiterProvider,
    private readonly iEnsureRateLimitingMiddleware: IEnsureRateLimitingMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter): Promise<void> {
    const schema = this.iUserValidator.validateRegister();
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
      return adapter.res.status(429).send({
        message: 'Exceeded Registration Rate Limit',
        retryAfter: number,
      });
    }

    try {
      const {
        icon_id,
        name,
        surname,
        email,
        role,
        description,
        password,
        confirmPassword,
      }: IRegisterDTO = schema.parse(adapter.req.body);
      const response: IRegisterResponse = await this.iRegisterUseCase.execute({
        icon_id,
        name,
        surname,
        email,
        role,
        description,
        password,
        confirmPassword,
      });

      if (response instanceof UserConflictErrorResponse) {
        return adapter.res.status(409).send({
          message: 'User already exists',
        });
      }

      if (response instanceof UserProcessingConflictErrorResponse) {
        return adapter.res.status(409).send({
          message: 'User already processing',
        });
      }
      return adapter.res.status(201).send({
        temporary_access_token: response.temporary_access_token,
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
