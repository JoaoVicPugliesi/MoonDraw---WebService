import { ILogoutUseCase } from './ILogoutUseCase';
import { ILogOutController } from './ILogoutController';
import { IRefreshTokenRepositoryPrismaImpl } from '@infra/repositories_implementation/RefreshToken/IRefreshTokenRepositoryPrismaImpl';
import { IEnsureMiddlewareImpl } from '@application/middlewares/IEnsureMiddlewareImpl';

const iRepo = new IRefreshTokenRepositoryPrismaImpl();
const iUseCase = new ILogoutUseCase(iRepo);
const iEnsureMiddleware = new IEnsureMiddlewareImpl();
const iController = new ILogOutController(iUseCase, iEnsureMiddleware);
const iLogout: ILogOutController = iController;

export { iLogout };