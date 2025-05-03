import { ISaveProductFactory } from '@application/factories/Product/SaveProduct/ISaveProductFactory';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { ISaveProductController } from './ISaveProductController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { IProductValidatorZodImpl } from '@application/validators/Request/Product/IProductValidatorZodImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new ISaveProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new IProductValidatorZodImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new ISaveProductController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iSaveProduct: ISaveProductController = iController;

export { iSaveProduct };
