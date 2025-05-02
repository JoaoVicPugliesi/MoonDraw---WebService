import { IResendVerificationTokenUseCase } from '@application/useCases/User/ResendVerificationToken/IResendVerificationTokenUseCase';
import { IEnsureMiddleware } from '@application/middlewares/IEnsureMiddleware';
import { RequestResponseAdapter } from '@adapters/RequestResponseAdapter';
import { ITokenService } from '@domain/services/Token/ITokenService';
import {
  IResendVerificationTokenResponse,
  SessionIsExpiredErrorResponse,
} from './IResendVerificationTokenDTO';
import { TokenInvalidErrorResponse, TokenIsMissingErrorResponse } from '@application/handlers/MiddlewareResponses/MiddlewareHandlers';

export class IResendVerificationTokenController {
  constructor(
    private readonly iResendVerificationTokenUseCase: IResendVerificationTokenUseCase,
    private readonly iTokenService: ITokenService,
    private readonly iEnsureMiddleware: IEnsureMiddleware
  ) {}

  async handle(adapter: RequestResponseAdapter) {
    const ensure:
      | string
      | TokenIsMissingErrorResponse
      | TokenInvalidErrorResponse =
      this.iEnsureMiddleware.ensureTemporaryAccessToken(
        adapter,
        this.iTokenService,
        process.env.JWT_TEMPORARY_KEY!
      );

    if (ensure instanceof TokenIsMissingErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Temporary Access Token is missing' });
    }

    if (ensure instanceof TokenInvalidErrorResponse) {
      return adapter.res
        .status(401)
        .send({ message: 'Temporary Access Token is invalid' });
    }

    try {
      const response:
        | SessionIsExpiredErrorResponse
        | IResendVerificationTokenResponse =
        await this.iResendVerificationTokenUseCase.execute({
          verification_token: ensure,
        });

      if (response instanceof SessionIsExpiredErrorResponse) {
        return adapter.res.status(401).send({
          message: 'Session is expired.',
        });
      }
      return adapter.res.status(200).send({
        message: 'Token resended',
      });
    } catch (error) {
      return adapter.res.status(500).send({ 
        message: 'Server internal error',
        error: error
    });
    }
  }
}
