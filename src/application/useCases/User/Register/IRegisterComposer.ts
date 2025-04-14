import { IRegisterController } from "./IRegisterController";
import { IRegisterFactory } from "@application/factories/User/Register/IRegisterFactory";

const iRegisterFactory = new IRegisterFactory();
const iRegisterUseCase = iRegisterFactory.compose();
const iRegisterController = new IRegisterController(iRegisterUseCase);
const register: IRegisterController = iRegisterController;

export { register };