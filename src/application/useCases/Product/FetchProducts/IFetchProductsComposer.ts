import { IFetchProductsFactory } from '@application/factories/Product/FetchProducts/IFetchProductsFactory';
import { IFetchProductsController } from './IFetchProductsController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IFetchProductsFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl()
const iEnsureMiddlware = new IEnsureMiddlewareImpl();
const iController = new IFetchProductsController(iUseCase, iTokenService, iEnsureMiddlware);
const iFetchProducts: IFetchProductsController = iController;

export { iFetchProducts };