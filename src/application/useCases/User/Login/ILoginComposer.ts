import { ILoginController } from './ILoginController';
import { ILoginFactory } from '@application/factories/User/Login/ILoginFactory';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';
import { IUserValidatorZodImpl } from '@application/validators/Request/User/IUserValidatorZodImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';

const iFactory = new ILoginFactory();
const iUseCase = iFactory.compose();
const iValidator = new IUserValidatorZodImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new ILoginController(
  iUseCase,
  iValidator,
  iProvider,
  iEnsureRateLimiting
);
const iLogin: ILoginController = iController;

export { iLogin };
