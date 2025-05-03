import z from 'zod';
import { IConfirmMailUseCase } from './IConfirmMailUseCase';
import {
  IConfirmMailDTO,
  TokenExpiredErrorResponse,
  TokenDoesNotMatchErrorResponse,
} from './IConfirmMailDTO';
import { IEnsureAuthMiddleware } from '@application/middlewares/Auth/IEnsureAuthMiddleware';
import { IUserValidator } from '@application/validators/Request/User/IUserValidator';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  TokenInvalidErrorResponse,
  TokenIsMissingErrorResponse,
} from '@application/handlers/MiddlewareResponses/AuthMiddlewareHandlers';

export class IConfirmMailController {
  constructor(
    private readonly iConfirmMailUseCase: IConfirmMailUseCase,
    private readonly iUserValidator: IUserValidator,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureAuthMiddleware: IEnsureAuthMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const schema = this.iUserValidator.validateConfirmMail();

    const ensure:
      | string
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse =
      this.iEnsureAuthMiddleware.ensureTemporaryAccessToken(
        adapter,
        this.iTokenService,
        process.env.JWT_TEMPORARY_KEY!
      );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res.status(401).send({ message: 'Temporary Access Token is missing' });
    }

    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res.status(401).send({ message: 'Temporary Access Token is invalid' });
    }

    try {
      const { verification_token }: IConfirmMailDTO = schema.parse(adapter.req.body);
      const response:
        | TokenDoesNotMatchErrorResponse
        | TokenExpiredErrorResponse
        | void = await this.iConfirmMailUseCase.execute({
        verification_token,
        ensure_verification_token: ensure,
      });

      if (response instanceof TokenDoesNotMatchErrorResponse) {
        return adapter.res.status(401).send({
          message: 'Verification Token does not match',
        });
      }

      if (response instanceof TokenExpiredErrorResponse) {
        return adapter.res.status(401).send({
          message: 'Verification Token is expired',
        });
      }

      return adapter.res.status(201).send({
        message: 'User Saved 🚀',
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
