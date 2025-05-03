import { ISelectProductController } from './ISelectProductController';
import { ISelectProductFactory } from '@application/factories/Product/SelectProduct/ISelectProductFactory';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';

const iFactory = new ISelectProductFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new ISelectProductController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware
);
const iSelectProduct: ISelectProductController = iController;

export { iSelectProduct };
