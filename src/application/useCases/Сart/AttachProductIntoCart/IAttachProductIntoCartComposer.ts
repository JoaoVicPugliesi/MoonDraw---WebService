import { IAttachProductIntoCartFactory } from '@application/factories/Cart/AttachProductIntoCart/IAttachProductIntoCartFactory';
import { IAttachProductIntoCartController } from './IAttachProductIntoCartController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { ICartValidatorZodImpl } from '@application/validators/Request/Cart/ICartValidatorZodImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new IAttachProductIntoCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new ICartValidatorZodImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IAttachProductIntoCartController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iAttachProductIntoCart: IAttachProductIntoCartController = iController;

export { iAttachProductIntoCart };
