import { IListPurchasesFactory } from "@application/factories/Purchase/ListPurchases/IListPurchasesFactory";
import { ITokenServiceJWTImpl } from "@infra/services/ITokenServiceJWTImpl";
import { IListPurchasesController } from "./IListPurchasesController";
import { IEnsureAuthMiddlewareImpl } from "@application/middlewares/Auth/IEnsureAuthMiddlewareImpl";
import { IRateLimiterProviderRedisImpl } from "@infra/providers/RateLimiter/IRateLimiterProviderRedisImpl";
import { IEnsureRateLimitingMiddlewareImpl } from "@application/middlewares/RateLimiting/IEnsureRateLimitingMiddlewareImpl";

const iFactory = new IListPurchasesFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iProvider = new IRateLimiterProviderRedisImpl();
const iEnsureRateLimiting = new IEnsureRateLimitingMiddlewareImpl();
const iController = new IListPurchasesController(
    iUseCase,
    iTokenService,
    iEnsureAuthMiddleware,
    iProvider,
    iEnsureRateLimiting
);
const iListPurchases: IListPurchasesController = iController;

export { iListPurchases };