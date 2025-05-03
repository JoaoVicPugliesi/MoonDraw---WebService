import { IInitiatePurchaseFactory } from '@application/factories/Purchase/InitiatePurchase/IInitiatePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IInitiatePurchaseController } from './IInitiatePurchaseController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new IInitiatePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IPurchaseValidatorZodImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IInitiatePurchaseController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iInitiatePurchase: IInitiatePurchaseController = iController;

export { iInitiatePurchase };
