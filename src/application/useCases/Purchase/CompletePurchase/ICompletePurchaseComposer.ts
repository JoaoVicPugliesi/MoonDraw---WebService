import { ICompletePurchaseFactory } from '@application/factories/Purchase/CompletePurchase/ICompletePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { ICompletePurchaseController } from './ICompletePurchaseController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IPurchaseValidatorZodImpl } from '@application/validators/Request/Purchase/IPurchaseValidatorZodImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new ICompletePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iValidator = new IPurchaseValidatorZodImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new ICompletePurchaseController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iCompletePurchase: ICompletePurchaseController = iController;

export { iCompletePurchase };
