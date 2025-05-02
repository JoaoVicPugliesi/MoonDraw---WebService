import { IResendVerificationTokenFactory } from '@application/factories/User/ResendVerificationToken/IResendVerificationTokenFactory';
import { IResendVerificationTokenController } from './IResendVerificationTokenController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IResendVerificationTokenFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IResendVerificationTokenController(
  iUseCase,
  iTokenService,
  iEnsureMiddleware
);
const iResendVerificationToken: IResendVerificationTokenController = iController;

export { iResendVerificationToken };