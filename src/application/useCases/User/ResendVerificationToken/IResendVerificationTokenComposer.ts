import { IResendVerificationTokenFactory } from '@application/factories/User/ResendVerificationToken/IResendVerificationTokenFactory';
import { IResendVerificationTokenController } from './IResendVerificationTokenController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new IResendVerificationTokenFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IResendVerificationTokenController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iResendVerificationToken: IResendVerificationTokenController = iController;

export { iResendVerificationToken };