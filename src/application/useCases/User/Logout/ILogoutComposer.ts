import { ILogOutController } from './ILogoutController';
import { IEnsureAuthMiddlewareImpl } from '@application/middlewares/Auth/IEnsureAuthMiddlewareImpl';
import { ILogoutFactory } from '@application/factories/User/Logout/ILogoutFactory';

const iFactory = new ILogoutFactory();
const iUseCase = iFactory.compose();
const iEnsureAuthMiddleware = new IEnsureAuthMiddlewareImpl();
const iController = new ILogOutController(iUseCase, iEnsureAuthMiddleware);
const iLogout: ILogOutController = iController;

export { iLogout };