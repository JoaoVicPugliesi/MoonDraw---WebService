import { ILogoutRepoPrismaImpl } from '@infra/repositories_implementation/User/Logout/ILogoutRepoPrismaImpl';
import { ILogoutUseCase } from './ILogoutUseCase';
import { ILogOutController } from './ILogoutController';

const iLogoutRepo = new ILogoutRepoPrismaImpl();
const iLogoutUseCase = new ILogoutUseCase(iLogoutRepo);
const iLogoutController = new ILogOutController(iLogoutUseCase);
const logout: ILogOutController = iLogoutController;

export { logout };