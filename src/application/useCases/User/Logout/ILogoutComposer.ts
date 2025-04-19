import { ILogoutUseCase } from './ILogoutUseCase';
import { ILogOutController } from './ILogoutController';
import { IRefreshTokenRepositoryPrismaImpl } from '@infra/repositories_implementation/RefreshToken/IRefreshTokenRepositoryPrismaImpl';

const iRepo = new IRefreshTokenRepositoryPrismaImpl();
const iUseCase = new ILogoutUseCase(iRepo);
const iController = new ILogOutController(iUseCase);
const iLogout: ILogOutController = iController;

export { iLogout };