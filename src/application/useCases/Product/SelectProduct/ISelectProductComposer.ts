import { ISelectProductController } from './ISelectProductController';
import { ISelectProductFactory } from '@application/factories/Product/SelectProduct/ISelectProductFactory';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';

const iFactory = new ISelectProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new ISelectProductController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iSelectProduct: ISelectProductController = iController;

export { iSelectProduct };
