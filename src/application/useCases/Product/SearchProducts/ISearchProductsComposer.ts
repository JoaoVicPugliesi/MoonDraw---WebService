import { ISearchProductsFactory } from "@application/factories/Product/SearchProducts/ISearchProductsFactory";
import { ISearchProductsController } from "./ISearchProductsController";
import { ITokenServiceJWTImpl } from "@infra/services/ITokenServiceJWTImpl";
import { IEnsureAuthMiddlewareImpl } from "@application/middlewares/Auth/IEnsureAuthMiddlewareImpl";
import { IRateLimiterProviderRedisImpl } from "@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl";
import { IEnsureRateLimitingMiddlewareImpl } from "@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl";

const iFactory = new ISearchProductsFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new ISearchProductsController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware,
  iProvider,
  iEnsureRateLimiting
);
const iSearchProducts: ISearchProductsController = iController;

export { iSearchProducts };
