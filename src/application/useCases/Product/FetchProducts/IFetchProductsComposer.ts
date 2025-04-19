import { IFetchProductsFactory } from '@application/factories/Product/IFetchProducts/IFetchProductsFactory';
import { IFetchProductsController } from './IFetchProductsController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';

const iFactory = new IFetchProductsFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl()
const iController = new IFetchProductsController(iUseCase, iTokenService);
const iFetchProducts: IFetchProductsController = iController;

export { iFetchProducts };