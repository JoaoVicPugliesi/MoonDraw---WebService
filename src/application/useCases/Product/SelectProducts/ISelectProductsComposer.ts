import { ISelectProductsFactory } from '@application/factories/Product/ISelectProducts/ISelectProductsFactory';
import { ISelectProductsController } from './ISelectProductsController';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';

const iFactory = new ISelectProductsFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl()
const iController = new ISelectProductsController(iUseCase, iTokenService);
const iSelectProducts: ISelectProductsController = iController;

export { iSelectProducts };