import { IRemovePurchaseFactory } from '@application/factories/Purchase/RemovePurchase/IRemovePurchaseFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IRemovePurchaseController } from './IRemovePurchaseController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new IRemovePurchaseFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IRemovePurchaseController(
    iUseCase,
    iTokenService,
    iEnsureAuthMiddleware,
    iProvider,
    iEnsureRateLimiting
);
const iRemovePurchase: IRemovePurchaseController = iController;

export { iRemovePurchase };