import { ICheckoutPurchaseFactory } from '@application/factories/Purchase/CheckoutPurchase/ICheckoutPurchaseFactory';
import { ICheckoutPurchaseController } from './ICheckoutPurchaseController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new ICheckoutPurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new ICheckoutPurchaseController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iCheckoutPurchase: ICheckoutPurchaseController = iController;

export { iCheckoutPurchase };
