import { IListCartContentFactory } from '@application/factories/Cart/ListCartContent/IListCartContentFactory';
import { IListCartContentController } from './IListCartContentController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';

const iFactory = new IListCartContentFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new IListCartContentController(
  iUseCase,
  iTokenService,
  iEnsureAuthMiddleware
);
const iListCartContent: IListCartContentController = iController;

export { iListCartContent };
