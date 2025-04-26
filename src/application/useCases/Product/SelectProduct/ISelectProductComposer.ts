import { ISelectProductController } from './ISelectProductController';
import { ISelectProductFactory } from '@application/factories/Product/SelectProduct/ISelectProductFactory';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';

const iFactory = new ISelectProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new ISelectProductController(iUseCase, iTokenService, iEnsureMiddleware);
const iSelectProduct: ISelectProductController = iController;

export { iSelectProduct };