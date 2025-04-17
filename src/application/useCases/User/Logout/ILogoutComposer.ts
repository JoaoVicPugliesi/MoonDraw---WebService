import { ILogoutRepoPrismaImpl } from '@infra/repositories_implementation/User/Logout/ILogoutRepoPrismaImpl';
import { ILogoutUseCase } from './ILogoutUseCase';
import { ILogOutController } from './ILogoutController';

const iRepo = new ILogoutRepoPrismaImpl();
const iUseCase = new ILogoutUseCase(iRepo);
const iController = new ILogOutController(iUseCase);
const iLogout: ILogOutController = iController;

export { iLogout };