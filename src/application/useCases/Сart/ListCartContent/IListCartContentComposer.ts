import { IListCartContentFactory } from '@application/factories/Cart/ListCartContent/IListCartContentFactory';
import { IListCartContentController } from './IListCartContentController';
import { ITokenServiceJWTImpl } from '@infra/services/ITokenServiceJWTImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iFactory = new IListCartContentFactory();
const iUseCase = iFactory.compose();
const iTokenService = new ITokenServiceJWTImpl();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new IListCartContentController(
  iUseCase,
  iTokenService,
  iEnsureMiddleware
);
const iListCartContent: IListCartContentController = iController;

export { iListCartContent };
