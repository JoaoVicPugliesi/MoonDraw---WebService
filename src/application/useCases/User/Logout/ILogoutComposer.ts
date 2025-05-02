import { ILogOutController } from './ILogoutController';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';
import { ILogoutFactory } from '@application/factories/User/Logout/ILogoutFactory';

const iFactory = new ILogoutFactory();
const iUseCase = iFactory.compose();
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new ILogOutController(iUseCase, iEnsureMiddleware);
const iLogout: ILogOutController = iController;

export { iLogout };