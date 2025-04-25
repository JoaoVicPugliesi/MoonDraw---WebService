import { ISearchProductsFactory } from '@application/factories/Product/SearchProducts/ISearchProductsFactory';
import { ISearchProductsController } from './ISearchProductsController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new ISearchProductsFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new ISearchProductsController(iUseCase, iTokenService, iEnsureMiddleware);
const iSearchProducts: ISearchProductsController = iController;

export { iSearchProducts };