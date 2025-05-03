import { IRefreshAccessTokenFactory } from '@application/factories/RefreshToken/RefreshAccessToken/IRefreshAccessTokenFactory';
import { IRefreshAccessTokenController } from './IRefreshAccessTokenController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new IRefreshAccessTokenFactory();
const iUseCase = iFactory.compose();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IRefreshAccessTokenController(
  iUseCase,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iRefreshAccessToken: IRefreshAccessTokenController = iController;

export { iRefreshAccessToken };
