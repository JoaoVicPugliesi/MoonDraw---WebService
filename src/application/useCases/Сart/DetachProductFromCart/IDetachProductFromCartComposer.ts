import { IDetachProductFromCartFactory } from '@application/factories/Cart/DetachProductFromCart/IDetachProductFromCartFactory';
import { IDetachProductFromCartController } from './IDetachProductFromCartController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { ICartValidatorZodImpl } from '@application/validators/Request/Cart/ICartValidatorZodImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';

const iFactory = new IDetachProductFromCartFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iValidator = new ICartValidatorZodImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IDetachProductFromCartController(
  iUseCase,
  iTokenService,
  iValidator,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);

const iDetachProductFromCart: IDetachProductFromCartController = iController;

export { iDetachProductFromCart };
