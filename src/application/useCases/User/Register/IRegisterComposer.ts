import { IRegisterController } from './IRegisterController';
import { IRegisterFactory } from '@application/factories/User/Register/IRegisterFactory';
import { IEnsureRateLimitingMiddlewareImpl } from '@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl';
import { IUserValidatorZodImpl } from '@application/validators/Request/User/IUserValidatorZodImpl';
import { IRateLimiterProviderRedisImpl } from '@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl';

const iFactory = new IRegisterFactory();
const iUseCase = iFactory.compose();
const iValidator = new IUserValidatorZodImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IRegisterController(
  iUseCase,
  iValidator,
  iProvider,
  iEnsureRateLimiting
);
const iRegister: IRegisterController = iController;

export { iRegister };
