import { ISelectProductController } from './ISelectProductController';
import { ISelectProductFactory } from '@application/factories/Product/SelectProduct/ISelectProductFactory';
import { ITokenServiceJWTImpl } from '@infra/services_implementation/ITokenServiceJWTImpl';

const iFactory = new ISelectProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iController = new ISelectProductController(iUseCase, iTokenService);
const iSelectProduct: ISelectProductController = iController;

export { iSelectProduct };