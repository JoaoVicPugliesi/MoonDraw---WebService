import { IFetchProductsFactory } from '@application/factories/Product/FetchProducts/IFetchProductsFactory';
import { IFetchProductsController } from './IFetchProductsController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';

const iFactory = new IFetchProductsFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IFetchProductsController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware
);
const iFetchProducts: IFetchProductsController = iController;

export { iFetchProducts };
