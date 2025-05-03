import { ILogOutController } from './ILogoutController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { ILogoutFactory } from '@application/factories/User/Logout/ILogoutFactory';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new ILogoutFactory();
const iUseCase = iFactory.compose();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new ILogOutController(
  iUseCase,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iLogout: ILogOutController = iController;

export { iLogout };
