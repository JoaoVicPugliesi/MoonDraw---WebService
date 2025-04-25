import { IListPurchasesFactory } from "@application/factories/Purchase/ListPurchases/IListPurchasesFactory";
import { ITokenServiceJWTImpl } from "@infra/services_implementation/ITokenServiceJWTImpl";
import { IListPurchasesController } from "./IListPurchasesController";
import { IEnsureMiddlewareImpl } from "@application/middlewares/IEnsureMiddlewareImpl";

const iFactory = new IListPurchasesFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IListPurchasesController(
    iUseCase,
    iTokenService,
    iEnsureMiddleware
);
const iListPurchases: IListPurchasesController = iController;

export { iListPurchases };