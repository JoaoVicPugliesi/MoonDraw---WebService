import { IListPurchasesFactory } from "@application/factories/Purchase/ListPurchases/IListPurchasesFactory";
import { ITokenServiceJWTImpl } from "@infra/services/ITokenServiceJWTImpl";
import { IListPurchasesController } from "./IListPurchasesController";
import { IEnsureAuthMiddlewareImpl } from "@application/middlewares/Auth/IEnsureAuthMiddlewareImpl";

const iFactory = new IListPurchasesFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IListPurchasesController(
    iUseCase,
    iTokenService,
    iEnsureAuthMiddleware
);
const iListPurchases: IListPurchasesController = iController;

export { iListPurchases };