import { IResendVerificationTokenFactory } from '@application/factories/User/ResendVerificationToken/IResendVerificationTokenFactory';
import { IResendVerificationTokenController } from './IResendVerificationTokenController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';

const iFactory = new IResendVerificationTokenFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IResendVerificationTokenController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware
);
const iResendVerificationToken: IResendVerificationTokenController = iController;

export { iResendVerificationToken };