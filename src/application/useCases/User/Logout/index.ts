import { ILogoutRepoImpl } from "@infra/repositories_implementation/User/Logout/ILogoutRepoImpl";
import { ILogoutUseCase } from "./ILogoutUseCase";
import { ILogOutController } from "./ILogoutController";

const iLogoutRepo = new ILogoutRepoImpl();
const iLogoutUseCase = new ILogoutUseCase(iLogoutRepo);
const iLogoutController = new ILogOutController(iLogoutUseCase);
export const logout: ILogOutController = iLogoutController;