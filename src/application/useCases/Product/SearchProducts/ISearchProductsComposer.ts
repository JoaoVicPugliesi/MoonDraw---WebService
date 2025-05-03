import { ISearchProductsFactory } from "@application/factories/Product/SearchProducts/ISearchProductsFactory";
import { ISearchProductsController } from "./ISearchProductsController";
import { ITokenServiceJWTImpl } from "@infra/services/ITokenServiceJWTImpl";
import { IEnsureAuthMiddlewareImpl } from "@application/middlewares/Auth/IEnsureAuthMiddlewareImpl";

const iFactory = new ISearchProductsFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new ISearchProductsController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware
);
const iSearchProducts: ISearchProductsController = iController;

export { iSearchProducts };
